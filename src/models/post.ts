export default class PostModel {
    constructor(
        public title: string,
        public content: string,
        public authorId: number,
        public createdAt: Date,
            
    ) {}
    static fromBody (

         title: string,
         content: string,
         author: number,
    
    ) {
        const post = new PostModel(
            title,
            content,
            author,
            new Date(),
        );
        return post;
    }
}