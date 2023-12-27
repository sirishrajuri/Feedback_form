export interface Feedback{
	id: number;
	title:string;
	userId: number;
	userName: string;
	rating: string;
	comment : string;
	commentDate: string;
}


export interface IComments {
	content: string;
	id: number;
	user: IUser;
	replies: IReplies[];
}

export interface IReplies {
	content: string;
	replyingTo: string;
	user: IUser;
}

export interface IUser {
	image: string;
	name: string;
	username: string;
}

export interface ITab{ 
	title: string; 
	subtitle: string; 
}