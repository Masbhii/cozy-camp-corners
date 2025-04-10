
import { MessageCircle } from 'lucide-react';

export interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: number;
}

interface MessageBoardProps {
  messages: Message[];
}

const MessageBoard = ({ messages }: MessageBoardProps) => {
  return (
    <div className="card-paper p-5">
      <h3 className="font-semibold text-lg text-neutral-gray mb-4">Messages</h3>
      
      <div className="space-y-5">
        {messages.map((message) => (
          <div key={message.id} className="border-b border-cool-gray/20 pb-4 last:border-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-light-purple flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-purple">
                  {message.avatar}
                </span>
              </div>
              
              <div>
                <div className="font-medium text-neutral-gray">{message.author}</div>
                <div className="text-xs text-neutral-gray/70">{message.timestamp}</div>
              </div>
            </div>
            
            <p className="text-sm text-neutral-gray ml-11">{message.content}</p>
            
            {message.replies && (
              <div className="mt-2 ml-11">
                <button className="text-xs flex items-center gap-1 text-primary-purple hover:underline">
                  <MessageCircle size={12} />
                  <span>{message.replies} {message.replies === 1 ? 'reply' : 'replies'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 px-3 text-sm border border-dashed border-cool-gray/40 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors">
        + Write a new message
      </button>
    </div>
  );
};

export default MessageBoard;
