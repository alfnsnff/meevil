export interface Pop {
    id: number;
    tweet: string;
    file?: string;
    is_fav: boolean;
    user: {
      id: number;
      name: string;
      handle: string;
      avatar: string;
    };
  }