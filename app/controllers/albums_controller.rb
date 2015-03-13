class AlbumsController < ApplicationController
  before_action :ensure_logged_in

  def new
    @album = Album.new
    @band = Band.find_by_id(params[:band_id])
    render :new
  end

  def create
    @album = Album.new(album_params)
    @band = @album.band
    if @album.save
      flash[:success] = ['New album created!']
      redirect_to album_url(@album)
    else
      flash[:danger] = @album.errors.full_messages
      render :new
    end
  end

  def show
    @album = Album.find_by_id(params[:id])
    render :show
  end

  def edit
    @album = Album.find_by_id(params[:id])
    @band = @album.band
    render :edit
  end

  def update
    @album = Album.find_by_id(params[:id])
    @band = @album.band
    if @album.update(album_params)
      flash[:success] = ["album updated"]
      redirect_to album_url(@album)
    else
      flash[:danger] = @album.errors.full_messages
      render :edit
    end
  end

  def destroy
    @album = Album.find_by_id(params[:id])
    @album.destroy
    redirect_to band_url(@album.band)
  end

  private

  def album_params
    params.require(:album).permit(:band_id, :name, :recording_type)
  end
end
