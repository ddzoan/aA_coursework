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
      redirect_to sub_url(@post.sub)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def edit
    @subs = Sub.all
    render :edit
  end

  def update
    @subs = Sub.all
    if @post.update(post_params)
      redirect_to sub_url(@post.sub)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, :sub_id)
  end

  def ensure_post_author
    @post = Post.find(params[:id])
    unless @post.author == current_user
      redirect_to sub_url(@post.sub)
    end
  end
end
