// types.ts
export interface Advertisement {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  description: string;
  price: number;
  executionTime: string; 
  userID: string;
  completeUserID: string;
  acceptedUserID: string;
}
export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  cognitoSub: string;
  phone: string;
  balans: number;
}