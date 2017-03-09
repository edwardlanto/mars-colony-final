import { Component, OnInit } from '@angular/core';
import { BLOG_URL } from '../models/API';
import { BlogAPIService } from '../apiService/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [BlogAPIService],
})
export class BlogComponent implements OnInit {
  blogPosts: Object;

  constructor(private BlogAPIService: BlogAPIService) {
    this.getBlogPosts();

  }//Constructor
  replaceHTML(posts) {
    const newArray = posts.map((post) => {
      const newString = post.content.rendered.replace(/<p>|<\/p>/ig, '')
      post.content.rendered = newString.replace(/&#8217;/ig, "'")
      return post
      // console.log(newnewString)
    })
    return newArray
  }


  getBlogPosts() {
    this.BlogAPIService.getBlogPosts()
      .subscribe((result) => {
        console.log(result);
        this.blogPosts = this.replaceHTML(result);
        console.log(this.blogPosts)

      })//subscribe-result
  }

  ngOnInit() {
  }

}

