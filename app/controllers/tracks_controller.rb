class TracksController < ApplicationController
  before_action :ensure_logged_in

  def new
    @track = Track.new
    render :new
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      flash[:success] = ['New track created!']
      redirect_to track_url(@track)
    else
      flash[:danger] = @track.errors.full_messages
      redirect_to new_album_track_url(params[:track][:album_id])
    end
  end

  def show
    @track = Track.find_by_id(params[:id])
    render :show
  end

  def edit
    @track = Track.find_by_id(params[:id])
    render :edit
  end

  def update
    @track = Album.find_by_id(params[:id])
    @album = @track.album
    if @track.update(track_params)
      flash[:success] = ["track updated"]
      redirect_to track_url(@track)
    else
      flash[:danger] = @track.errors.full_messages
      render :edit
    end
  end

  def destroy
    @track = Track.find_by_id(params[:id])
    @track.destroy
    redirect_to album_url(@track.band)
  end

  private

  def track_params
    params.require(:track).permit(:album_id, :name, :track_type, :lyrics)
  end
end
