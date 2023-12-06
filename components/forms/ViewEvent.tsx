'use client'
import React, { useEffect, useState } from "react";
import { fetchTeamMembers, addTeamMember, removeTeamMember } from "@/lib/actions/event.actions";
import Link from "next/link";
import { getActivity } from "@/lib/actions/user.actions"; // Adjust the import path accordingly

interface ViewEventProps {
  eventId: string;
  authorId: string;
  opponentId: string;
  currentUserId: string;
  currentUserName: string;
  team1: {
    name: string;
    members: string[]; 
  };
  team2: {
    name: string;
    members: string[]; 
  };
}

function ViewEvent({
  eventId,
  authorId,
  opponentId,
  currentUserId,
  currentUserName,
  team1,
  team2,
}: ViewEventProps) {
  const [team1Members, setTeam1Members] = useState<string[]>([]);
  const [team2Members, setTeam2Members] = useState<string[]>([]);
  const [userTeam, setUserTeam] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const fetchedTeam1Members = await fetchTeamMembers(eventId, "team1");
        const fetchedTeam2Members = await fetchTeamMembers(eventId, "team2");
        
        setTeam1Members(fetchedTeam1Members || []);
        setTeam2Members(fetchedTeam2Members || []);
        console.log(fetchedTeam1Members)
        console.log(fetchedTeam2Members)
        if (fetchedTeam1Members && fetchedTeam1Members.includes(currentUserId)) {
          setUserTeam("team1");
        } else if (fetchedTeam2Members && fetchedTeam2Members.includes(currentUserId)) {
          setUserTeam("team2");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [eventId, currentUserId]);

  
  const handleJoinTeam = async (team: "team1" | "team2") => {
    try {
      const oppositeTeam = team === "team1" ? "team2" : "team1";
  
      // Fetch the current team members
      const currentTeamMembers = team === "team1" ? team1Members : team2Members;
  
      if (
        userTeam !== team &&
        currentTeamMembers.length < 7 &&
        !currentTeamMembers.includes(currentUserName)
      ) {
        // Check if the user is a member of the opposite team and remove them
        if (oppositeTeam === "team2" && team1Members.includes(currentUserName)) {
          await removeTeamMember(eventId, "team1", currentUserName);
        } else if (oppositeTeam === "team1" && team2Members.includes(currentUserName)) {
          await removeTeamMember(eventId, "team2", currentUserName);
        }
        
        // Check if the user is already a member of the new team
        if (!currentTeamMembers.includes(currentUserId)) {
          // Add the user to the new team
          await addTeamMember(eventId, team, currentUserId);
          const updatedMembers = await fetchTeamMembers(eventId, team);
          updateTeamMembers(team, updatedMembers);
  
          // Remove the user from the old team
          const oldTeam = oppositeTeam === "team1" ? "team1" : "team2";
          const oldTeamIndex = team1Members.indexOf(currentUserName);
          if (oldTeamIndex !== -1) {
            const updatedOldTeamMembers = [...team1Members];
            updatedOldTeamMembers.splice(oldTeamIndex, 1);
            updateTeamMembers(oldTeam, updatedOldTeamMembers);
          }
          const teamJoinData = {
            author: { id: currentUserId, name: currentUserName },
            teamJoined: team === "team1" ? team1.name : team2.name,
            createdAt: new Date(),
          };
          // Call the function to add the team join activity
          await getActivity(teamJoinData);
          setUserTeam(team);
        } else {
          console.log(`User is already a member of ${team}`);
        }
      } else {
        console.log(`Cannot join ${team}`);
      }
    } catch (error) {
      console.error(`Error joining ${team}:`, error);
      // Handle error (show message, log, etc.)
    }
  };
  
  const handleRemoveMember = async (team: "team1" | "team2", memberName: string) => {
    try {
      // Fetch the latest members before removing
      const fetchedTeam1Members = await fetchTeamMembers(eventId, "team1");
      const fetchedTeam2Members = await fetchTeamMembers(eventId, "team2");
  
      const updatedTeam1Members = fetchedTeam1Members || [];
      const updatedTeam2Members = fetchedTeam2Members || [];

  
      // Check if the user has permission to remove a member
      const hasPermission =
        (team === "team1" && updatedTeam1Members[0] === currentUserName) ||
        (team === "team2" && updatedTeam2Members[0] === currentUserName);
  
      if (hasPermission) {
        // Find the member with the specified name
        const removedMemberIndex = updatedTeam1Members.findIndex(member => member === memberName);
  
        if (removedMemberIndex !== -1) {
          // Remove the member by index
          updatedTeam1Members.splice(removedMemberIndex, 1);
  
          // Call the API to remove the member
          await removeTeamMember(eventId, team, memberName);
          // Update the state with the modified members list
          updateTeamMembers(team, updatedTeam1Members);
        } else {
          console.log(`Member with name ${memberName} not found in ${team}`);
        }
      } else {
        console.log(`User ${currentUserId} does not have permission to remove a member.`);
      }
    } catch (error) {
      console.error(`Error removing member from ${team}:`, error);
    }
  };
  

const updateTeamMembers = (team: "team1" | "team2", updatedMembers: string[]) => {
  console.log(`Updating ${team}Members in state:`, updatedMembers);

  if (team === "team1") {
    setTeam1Members(updatedMembers);
  } else if (team === "team2") {
    setTeam2Members(updatedMembers);

    // If joining Team 2, remove from Team 1
    if (team1Members.includes(currentUserId)) {
      setTeam1Members((prevTeam1Members) =>
        prevTeam1Members.filter((member) => member !== currentUserId)
      );
    }
  }

  console.log(
    `Updated ${team}Members in state:`,
    team === "team1" ? team1Members : team2Members
  );
};


  return (
    <div className="border border-gray-300 p-4 my-10 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Event Details</h2>

      <div className="mb-6 grid grid-cols-2">
        {/* Team 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Team 1</h3>
          <ul className="list-none pl-0">
            {team1Members.map((member, index) => (
              <li key={index} className="mb-2 text-white">
                {member}
                {(
                  (currentUserId !== authorId && currentUserId !== opponentId) ||
                  team2Members.includes(currentUserId) ||
                  team1Members.includes(currentUserId)
                ) && (
                  <button
                    onClick={() => handleRemoveMember("team1", member)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  >
                    X
                  </button>
                )}

              </li>
            ))}
          </ul>
          {userTeam !== "team1" && (
            <button
              onClick={() => handleJoinTeam("team1")}
              className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Join Team 1
            </button>
          )}
        </div>

        {/* Team 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Team 2</h3>
          <ul className="list-none pl-0">
            {team2Members.map((member, index) => (
              <li key={index} className="mb-2 text-white">
                {member}
               {(
                (currentUserId !== authorId && currentUserId !== opponentId) ||
                team2Members.includes(currentUserId) ||
                team1Members.includes(currentUserId)
              ) && (
                <button
                  onClick={() => handleRemoveMember("team2", member)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                >
                  X
                </button>
              )}

              </li>
            ))}
          </ul>
          {userTeam !== "team2" && (
            <button
              onClick={() => handleJoinTeam("team2")}
              className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Join Team 2
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;