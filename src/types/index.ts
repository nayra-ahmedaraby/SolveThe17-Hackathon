export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  isFavorite: boolean;
}

export interface User {
  name: string;
  email: string;
  interests: string[];
}

export type AvatarExpression = 
  | 'neutral' 
  | 'happy' 
  | 'angry' 
  | 'thinking' 
  | 'cool' 
  | 'excited' 
  | 'starEyes' 
  | 'confused' 
  | 'sleeping'
  | 'curious'
  | 'frown'
  | 'smile'
  | 'proud';

export interface Milestone {
  number: string;
  label: string;
  expression: AvatarExpression;
  completed: boolean;
}