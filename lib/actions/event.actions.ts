"use server"
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Event from "../models/event.model"; 
import Community from "../models/community.model";

interface Params {
  title: string;
  location: string;
  time: Date;
  description: string;
  author: string;
  opponent: string;
  communityId: string | null;
  path: string;
}

export async function editEvent({
  eventId,
  title,
  location,
  time,
  description,
  path,
}: {
  eventId: string;
  title: string;
  location: string;
  time: Date;
  description: string;
  path: string;
}) {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    event.title = title;
    event.location = location;
    event.time = time;
    event.description = description;
    await event.save();

    await revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to edit event: ${error.message}`);
  }
}
export async function createEvent({
  title,
  location,
  time,
  description,
  author,
  opponent,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdEvent = await Event.create({
      title,
      location,
      time,
      description,
      author,
      opponent,
      team1: { name: "Team 1", members: [author] },
      team2: { name: "Team 2", members: [opponent] },
      community: communityIdObject, 
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { events: createdEvent._id },
    });
    await User.findByIdAndUpdate(opponent, {
      $push: { events: createdEvent._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { events: createdEvent._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create event: ${error.message}`);
  }
}

export async function fetchEventById(eventId: string) {
  connectToDB();

  try {
    const event = await Event.findById(eventId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
     
      .exec();

    return event;
  } catch (err) {
    console.error("Error while fetching event:", err);
    throw new Error("Unable to fetch event");
  }
}


export async function deleteEvent(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const event = await Event.findById(id).populate("author community");

    if (!event) {
      throw new Error("Event not found");
    }
    await Event.deleteOne({ _id: id });

    await User.updateOne(
      { _id: event.author?._id },
      { $pull: { events: id } }
    );
    await User.updateOne(
      { _id: event.opponent?._id },
      { $pull: { events: id } }
    );

    if (event.community) {
      await Community.updateOne(
        { _id: event.community?._id },
        { $pull: { events: id } }
      );
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete event: ${error.message}`);
  }
}

export async function approveEvent(eventId: string, path: string ): Promise<void> {
  try {
    connectToDB();

    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    event.approve = true;
    await event.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to approve event: ${error.message}`);
  }
}

export async function fetchEvents(pageNumber = 1, pageSize = 5) {
  try {
    // Connect to the database
    await connectToDB();

    // Calculate the number of events to skip based on the page number and page size
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch events from the database
    const eventsQuery = Event.find({})
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "opponent",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id name image",
      });
    const totalEventsCount = await Event.countDocuments({});
    const events = await eventsQuery.exec();
    const isNext = totalEventsCount > skipAmount + events.length;
    return { events, isNext };
  } catch (error) {

 
  }
}

export async function fetchTeamMembers(eventId: string, team: "team1" | "team2"): Promise<string[]> {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch the event by eventId
    const event = await Event.findById(eventId)
      .populate({
        path: team === "team1" ? "team1.members" : "team2.members",
        model: User,
        select: "_id name",
      })
      .exec();

    // Check if the event exists
    if (!event) {
      throw new Error("Event not found");
    }

    // Extract member names
    const teamMembers = team === "team1" ? event.team1.members : event.team2.members;
    const memberNames = teamMembers.map((member) => member.name);

    return memberNames;
  } catch (error: any) {
    throw new Error(`Failed to fetch team members: ${error.message}`);
  }
}
// Function to add a member to a specific team within an event
export async function addTeamMember(eventId: string, team: "team1" | "team2", memberId: string): Promise<void> {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch the event by eventId
    const event = await Event.findById(eventId)
      .populate({
        path: "author opponent",
        model: User,
        select: "_id",
      })
      .exec();

    // Check if the team exists
    if (!event) {
      throw new Error("Event not found");
    }

    // Determine the team to update based on the selected team
    const teamToUpdate = team === "team1" ? event.author : event.opponent;

    // Check if the member already exists in the team
    if (teamToUpdate && teamToUpdate._id.toString() === memberId) {
      throw new Error("Member already exists in the team");
    }

    // Add the new member to the team
    if (team === "team1") {
      event.team1.members.push(memberId);
    } else {
      event.team2.members.push(memberId);
    }

    // Save the changes to the event
    await event.save();
  } catch (error: any) {
    throw new Error(`Failed to add team member: ${error.message}`);
  }
}

export async function removeTeamMember(eventId: string, team: "team1" | "team2", memberId: string): Promise<void> {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch the event by eventId
    const event = await Event.findById(eventId)
      .populate({
        path: "author opponent",
        model: User,
        select: "_id",
      })
      .exec();

    // Check if the event exists
    if (!event) {
      throw new Error("Event not found");
    }

    // Determine the team to update based on the selected team
    const teamToUpdate = team === "team1" ? event.team1 : event.team2;

    // Check if the member exists in the team
    const memberIndex = teamToUpdate.members.indexOf(memberId);
    if (memberIndex === 0) {
      console.error(`Member with ID ${memberId} not found in ${team} members array`);
      return; // Exit function gracefully since the member is not found
    }

    // Remove the member from the team
    teamToUpdate.members.splice(memberIndex, 1);

    // Save the changes to the event
    await event.save();

    console.log("Member removed successfully");
  } catch (error: any) {
    console.error(`Failed to remove team member: ${error.message}`);
    throw error; // Re-throw the error to propagate it to the calling code
  }
}


