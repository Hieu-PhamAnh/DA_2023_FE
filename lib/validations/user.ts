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

  Potential: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  WeakFoot: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 5" }),
  Skill: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 5" }),
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
  Volley: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Dribbling: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Curve: z
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
  Acceleration: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Speed: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Agility: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Reactions: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Balance: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  ShotPower: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Stamina: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  LongShots: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Aggression: z
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
  Vision: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Penalties: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Composure: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  Tackle: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
  SlidingTackle: z
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
  GKReflexes: z
    .string()
    .min(1, { message: "Min : 1" })
    .max(99, { message: "Min : 99" }),
});
