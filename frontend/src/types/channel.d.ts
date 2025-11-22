export interface Channel {
  _id: string;
  name: string;
  creator: string;
  members: { _id: string; fullName: string }[];
}
