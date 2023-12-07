import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  position: z.string(),
  Crossing: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Finishing: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Heading: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  ShortPass: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Freekick: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  LongPass: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  BallControl: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Intercept: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Positioning: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Marking: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Tackle: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  GKReflexes: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Height: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Weight: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
});
