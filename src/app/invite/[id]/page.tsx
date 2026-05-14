import { notFound } from 'next/navigation';
import { Invitation } from '@/types/invitation';
import { supabase } from '@/lib/supabase';
import LuxuryInvitation from '@/components/LuxuryInvitation';
import PremiumWeddingInvitation from '@/components/PremiumWeddingInvitation';
import BirthdayInvitation from '@/components/BirthdayInvitation';
import BabyShowerInvitation from '@/components/BabyShowerInvitation';
import GraduationInvitation from '@/components/GraduationInvitation';
import CorporateInvitation from '@/components/CorporateInvitation';
import FloralInvitation from '@/components/FloralInvitation';
import RusticInvitation from '@/components/RusticInvitation';
import CasualInvitation from '@/components/CasualInvitation';
import LuxuryGalaInvitation from '@/components/LuxuryGalaInvitation';
import ShareBar from '@/components/ShareBar';

interface Props {
  params: Promise<{ id: string }>;
}

async function getInvitation(id: string): Promise<(Invitation & { category: string }) | null> {
  const { data: inv, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single();

  if (invError || !inv) return null;

  let category = '';
  if (inv.template) {
    const { data: tmpl } = await supabase
      .from('templates')
      .select('category')
      .eq('id', inv.template)
      .single();
    category = tmpl?.category ?? '';
  }

  return { ...inv, category } as Invitation & { category: string };
}

export default async function InvitationPage({ params }: Props) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  if (!invitation) notFound();

  const category = invitation.category ?? '';
  const customization = invitation.customization ?? undefined;

  const sharedProps = {
    title: invitation.title,
    hostName: invitation.host_name,
    date: invitation.event_date,
    time: invitation.event_time,
    location: invitation.location,
    message: invitation.message ?? '',
    customization,
  };

  return (
    <>
      <ShareBar inviteId={id} title={invitation.title} />

      {category === 'wedding' ? (
        <PremiumWeddingInvitation
          title={invitation.title}
          brideName={invitation.host_name}
          groomName=""
          date={invitation.event_date}
          time={invitation.event_time}
          location={invitation.location}
          message={invitation.message ?? ''}
          customization={customization}
        />
      ) : category === 'birthday' ? (
        <BirthdayInvitation {...sharedProps} />
      ) : category === 'baby' ? (
        <BabyShowerInvitation {...sharedProps} />
      ) : category === 'graduation' ? (
        <GraduationInvitation {...sharedProps} />
      ) : category === 'corporate' ? (
        <CorporateInvitation {...sharedProps} />
      ) : category === 'floral' ? (
        <FloralInvitation {...sharedProps} />
      ) : category === 'rustic' ? (
        <RusticInvitation {...sharedProps} />
      ) : category === 'casual' ? (
        <CasualInvitation {...sharedProps} />
      ) : category === 'luxury' ? (
        <LuxuryGalaInvitation {...sharedProps} />
      ) : (
        <LuxuryInvitation
          title={invitation.title}
          hostName={invitation.host_name}
          date={invitation.event_date}
          time={invitation.event_time}
          location={invitation.location}
          message={invitation.message || undefined}
          customization={customization}
        />
      )}
    </>
  );
}
