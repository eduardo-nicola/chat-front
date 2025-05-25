import { Conversation, Message } from "./types"

// Helper function to generate stable timestamps
const getStableTime = (minutesAgo: number) => {
  const now = new Date()
  now.setMinutes(0, 0, 0) // Reset to the start of the hour
  return new Date(now.getTime() - minutesAgo * 60000).toISOString()
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey, how's it going?",
    lastMessageTime: getStableTime(15),
    unreadCount: 3,
    online: true
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Can you send me the report?",
    lastMessageTime: getStableTime(120),
    unreadCount: 0,
    online: false
  },
  {
    id: "3",
    name: "Carol Williams",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Lunch tomorrow?",
    lastMessageTime: getStableTime(1440),
    unreadCount: 1,
    online: true
  },
  {
    id: "4",
    name: "Dave Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Thanks for your help!",
    lastMessageTime: getStableTime(4320),
    unreadCount: 0,
    online: false
  },
  {
    id: "5",
    name: "Eve Davis",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Did you see the latest updates?",
    lastMessageTime: getStableTime(10080),
    unreadCount: 0,
    online: true
  },
  {
    id: "6",
    name: "Frank Miller",
    avatar: "https://i.pravatar.cc/150?img=6",
    lastMessage: "Let's catch up soon!",
    lastMessageTime: getStableTime(14400),
    unreadCount: 0,
    online: false
  },
  {
    id: "7",
    name: "Grace Wilson",
    avatar: "https://i.pravatar.cc/150?img=7",
    lastMessage: "The meeting is scheduled for next Monday.",
    lastMessageTime: getStableTime(20160),
    unreadCount: 0,
    online: true
  },
  {
    id: "8",
    name: "Team Chat",
    avatar: "https://i.pravatar.cc/150?img=8",
    lastMessage: "Henry: We need to discuss the project timeline.",
    lastMessageTime: getStableTime(30),
    unreadCount: 5,
    online: true
  }
]

export const mockMessages: Message[] = [
  {
    id: "1-1",
    conversationId: "1",
    sender: "other",
    content: "Hey there! How's your day going?",
    timestamp: getStableTime(60),
    read: true
  },
  {
    id: "1-2",
    conversationId: "1",
    sender: "me",
    content: "Pretty good! Just finished that project we talked about.",
    timestamp: getStableTime(55),
    read: true
  },
  {
    id: "1-3",
    conversationId: "1",
    sender: "other",
    content: "That's great to hear! Can you share some details about it?",
    timestamp: getStableTime(45),
    read: true
  },
  {
    id: "1-4",
    conversationId: "1",
    sender: "me",
    content: "Sure! I implemented that new design we discussed. It looks much cleaner now.",
    timestamp: getStableTime(40),
    read: true
  },
  {
    id: "1-5",
    conversationId: "1",
    sender: "other",
    content: "Awesome! Can't wait to see it. By the way, are you free for a coffee this weekend?",
    timestamp: getStableTime(30),
    read: true
  },
  {
    id: "1-6",
    conversationId: "1",
    sender: "me",
    content: "Saturday afternoon works for me. The usual place?",
    timestamp: getStableTime(20),
    read: true
  },
  {
    id: "1-7",
    conversationId: "1",
    sender: "other",
    content: "Perfect! See you there at 2pm.",
    timestamp: getStableTime(15),
    read: false
  },
  
  {
    id: "2-1",
    conversationId: "2",
    sender: "other",
    content: "Hi, I need the quarterly report for the meeting tomorrow.",
    timestamp: getStableTime(300),
    read: true
  },
  {
    id: "2-2",
    conversationId: "2",
    sender: "me",
    content: "I'm finalizing it now. Will send it within the hour.",
    timestamp: getStableTime(240),
    read: true
  },
  {
    id: "2-3",
    conversationId: "2",
    sender: "other",
    content: "Great, thanks! Also, can you include the marketing metrics we discussed?",
    timestamp: getStableTime(180),
    read: true
  },
  {
    id: "2-4",
    conversationId: "2",
    sender: "me",
    content: "Yes, they're already included in the report. I also added some insights based on the latest data.",
    timestamp: getStableTime(150),
    read: true
  },
  {
    id: "2-5",
    conversationId: "2",
    sender: "other",
    content: "Perfect. Can you send me the report?",
    timestamp: getStableTime(120),
    read: true
  },
  
  {
    id: "3-1",
    conversationId: "3",
    sender: "me",
    content: "Hey Carol, are you free for lunch tomorrow?",
    timestamp: getStableTime(2160),
    read: true
  },
  {
    id: "3-2",
    conversationId: "3",
    sender: "other",
    content: "I should be! What time were you thinking?",
    timestamp: getStableTime(1800),
    read: true
  },
  {
    id: "3-3",
    conversationId: "3",
    sender: "me",
    content: "How about 12:30 at that new Italian place downtown?",
    timestamp: getStableTime(1680),
    read: true
  },
  {
    id: "3-4",
    conversationId: "3",
    sender: "other",
    content: "Sounds perfect! I've been wanting to try their pasta.",
    timestamp: getStableTime(1500),
    read: true
  },
  {
    id: "3-5",
    conversationId: "3",
    sender: "me",
    content: "Great! I'll make a reservation. See you there!",
    timestamp: getStableTime(1440),
    read: true
  },
  {
    id: "3-6",
    conversationId: "3",
    sender: "other",
    content: "Lunch tomorrow?",
    timestamp: getStableTime(1440),
    read: false
  }
]