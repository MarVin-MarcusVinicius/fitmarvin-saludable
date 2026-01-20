export interface Exercise {
    title: string;
    muscle: string;
    img: string;
}

export interface Badge {
    label: string;
    icon: string;
}

export interface Goal {
    title: string;
    desc: string;
    icon: string;
}

export enum ChatRole {
    USER = 'user',
    MODEL = 'model'
}

export interface ChatMessage {
    role: ChatRole;
    text: string;
    timestamp: number;
}
