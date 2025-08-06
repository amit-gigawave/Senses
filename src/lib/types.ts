export type SnapshotType = {
  status?: number;
  message?: string;
  data?: any;
  error?: string;
};

export type LoginType = {
  phone: string;
  password: string;
};

export type LoginUser = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  designation: string | null;
  hospitalName: string | null;
  firebaseToken: string;
};

export type LoginResponse = {
  message: string;
  access_token: string;
  user: LoginUser;
};

export type OrderStatisticsType = {
  total: number;
  activeExecutives: number;
  pendingOrders: number;
  unAssignedOrders: number;
};

export type OrdersQueryType = {
  orderStatus?: string;
  orderType?: string;
  fieldExecutiveId?: string;
  hospitalStaffId?: string;
  startDate?: string;
  endDate?: string;
};

export type OrderType = {
  id: string;
  orderType: string;
  orderStatus: string;
  fieldExecutiveId: string | null;
  hospitalStaffId: string | null;
  patientName: string;
  patientMobileNumber: string;
  hospitalName: string | null;
  area: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  testType: string;
  prescription: string | null;
  samplePhoto: string | null;
  newPrescription: string | null;
  sampleCollectionDescription: string | null;
  amountCollected: number | null;
  collectionDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FieldExecutiveType = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  designation: string | null;
  hospitalName: string | null;
  isActive: boolean;
  lastLogin: string;
  firebaseToken: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserCreateType = {
  name: string;
  userId: string;
  email: string;
  phone: string;
  role: string;
};
