class PostsController < ApplicationController
  before_action :ensure_post_author, only: [:edit, :update]

  def new
    @post = Post.new
    @subs = Sub.all
    render :new
  end

  def create
    @post = current_user.posts.new(post_params)
    @subs = Sub.all
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
    # @comments = @post.comments.where(parent_comment_id: nil)
    @all_comments = @post.comments_by_parent_id
    render :show
  end

  def edit
    @subs = Sub.all
    render :edit
  end

  def update
    @subs = Sub.all
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def upvote
    @post = Post.find(params[:id])
    @post.votes.new(value: 1).save
    redirect_to post_url(@post)
  end

  def downvote
    @post = Post.find(params[:id])
    @post.votes.new(value: -1).save
    redirect_to post_url(@post)
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, :sub_ids => [])
  end

  def ensure_post_author
    @post = Post.find(params[:id])
    unless @post.author == current_user
      redirect_to post_url(@post)
    end
  end
end
