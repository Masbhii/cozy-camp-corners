
import { Mail } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
}

interface TeamMembersProps {
  members: TeamMember[];
}

const TeamMembers = ({ members }: TeamMembersProps) => {
  return (
    <div className="card-paper p-5">
      <h3 className="font-semibold text-lg text-neutral-gray mb-4">Team Members</h3>
      
      <div className="space-y-3">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center justify-between p-3 rounded-lg border border-cool-gray/30 bg-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-light-purple flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-purple">
                  {member.initials}
                </span>
              </div>
              <div>
                <div className="font-medium text-sm text-neutral-gray">{member.name}</div>
                <div className="text-xs text-neutral-gray/70">{member.role}</div>
              </div>
            </div>
            
            <button 
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-neutral-gray"
              aria-label={`Email ${member.name}`}
            >
              <Mail size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 px-3 text-sm border border-dashed border-cool-gray/40 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors">
        + Invite a team member
      </button>
    </div>
  );
};

export default TeamMembers;
