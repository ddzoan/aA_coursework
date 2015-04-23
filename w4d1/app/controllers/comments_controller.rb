class CommentsController < ApplicationController
  def create
    commented_thing = find_commentable

    comment = commented_thing.comments.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors.full_messages
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    render json: comment.destroy
  end

  def find_commentable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        return $1.classify.constantize.find(value)
      end
    end
    nil
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
