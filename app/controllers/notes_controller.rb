class NotesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @note = current_user.notes.new(notes_params)
    if @note.save
      flash[:success] = ["New note created!"]
    else
      flash[:danger] = @note.errors.full_messages
    end
    redirect_to track_url(@note.track)
  end

  def destroy
    @note = Note.find(params[:id])
    if @note.user == current_user
      @note.destroy
      redirect_to track_url(@note.track)
    else
      render text: 'you are the worst', status: :forbidden
    end
  end

  private

  def notes_params
    params.require(:note).permit(:track_id, :note)
  end
end
