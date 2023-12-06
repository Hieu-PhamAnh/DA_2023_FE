"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventValidation } from "@/lib/validations/event";
import { createEvent, editEvent } from "@/lib/actions/event.actions";
import { useState } from "react";

interface Props {
  userId: string;
  authorId: string;
  opponentId: string;
  eventId?: string;
  eventTitle?: string;
  eventLocation?: string;
  eventTime?: Date;
  eventDescription?: string;
}

function PostEvent({ userId, authorId, opponentId, eventId, eventTitle, eventLocation, eventTime,eventDescription }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { organization } = useOrganization();
  
  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      title: eventTitle || "",
      location: eventLocation || "",
      time : eventTime || new Date(),
      description: eventDescription || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EventValidation>) => {
    try {
      if (eventId && eventTitle) {
        await editEvent({
          eventId,
          title: values.title,
          location: values.location,
          time: selectedDate,
          description: values.description,
          path: pathname,
        });
      } else {
        await createEvent({
          title: values.title,
          location: values.location,
          time: selectedDate,
          description: values.description,
          author: authorId,
          opponent: opponentId,
          communityId: organization ? organization.id : null,
          path: pathname,
        });
      }
  
      await router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
         <FormField
          control={form.control}
          name="opponentId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                OpponentID : {opponentId}
              </FormLabel>
              {/* <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="text" {...field} readOnly  />
              </FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                AuthorID : {authorId}
              </FormLabel>
              {/* <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input type="text" {...field} readOnly  />
              </FormControl> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Title
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Location
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className="text-base-semibold text-light-2">
              Time
            </FormLabel>
            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
            <DatePicker
                selected={selectedDate}
                onChange={(value) => {
                  const date = new Date(value);
                  setSelectedDate(date);
                }}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Description
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-lime-500">
          {eventId ? "Edit" : "Create"} Event
        </Button>
      </form>
    </Form>
  );
}

export default PostEvent;
