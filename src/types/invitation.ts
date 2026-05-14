export interface InvitationCustomization {
  accentColor: string;
  bgColor: string;
  textColor: string;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  fontFamily: 'playfair' | 'inter' | 'mono';
  theme: string;
}

export const DEFAULT_CUSTOMIZATION: InvitationCustomization = {
  accentColor: '#C9A96E',
  bgColor: '#FDFAF4',
  textColor: '#1A1208',
  fontSize: 'md',
  fontFamily: 'playfair',
  theme: 'gold',
};

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
  customization?: InvitationCustomization | null;
}

export type Template = {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
};
