export const OrderStatus = {
  Created: "Created",
  Assigned: "Assigned",
  Completed: "Completed",
  OnTheWay: "OnTheWay",
} as const;

export const OrderTypeEnum = {
  Home: "Home",
  Hospital: "Hospital",
} as const;

export const UserRole = {
  admin: "admin",
  field_executive: "field_executive",
  hospital_staff: "hospital_staff",
} as const;
