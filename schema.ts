import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  jsonb,
  date,
} from "drizzle-orm/pg-core"

// ---------- Better Auth tables ----------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// ---------- App tables ----------
export const trip = pgTable("trip", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  days: integer("days").notNull(),
  budget: integer("budget"),
  travelers: integer("travelers").default(1),
  interests: text("interests"),
  itinerary: jsonb("itinerary").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const pass = pgTable("pass", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  passCode: text("passCode").notNull().unique(),
  passType: text("passType").notNull(),
  holderName: text("holderName").notNull(),
  cnic: text("cnic"),
  origin: text("origin"),
  destination: text("destination"),
  validFrom: date("validFrom").notNull(),
  validUntil: date("validUntil").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const booking = pgTable("booking", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  type: text("type").notNull(),
  itemName: text("itemName").notNull(),
  location: text("location"),
  checkIn: date("checkIn"),
  checkOut: date("checkOut"),
  guests: integer("guests").default(1),
  amount: integer("amount").notNull(),
  status: text("status").default("confirmed").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  destinationSlug: text("destinationSlug").notNull(),
  destinationName: text("destinationName").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const review = pgTable("review", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  authorName: text("authorName").notNull(),
  destinationSlug: text("destinationSlug").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  status: text("status").default("approved").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})

export const notification = pgTable("notification", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").default("info").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
})
