export interface Invitation {
  id: string;
  template: string;
  title: string;
  host_name: string;
  event_date: string;
  event_time: string;
  location: string;
  message: string;
  created_at: string;
}

export type Template = {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
};
