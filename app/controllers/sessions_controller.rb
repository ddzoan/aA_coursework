class SessionsController < ApplicationController
  before_action :ensure_logged_out, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      log_in_user!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new
      flash[:danger] = ["Invalid login"]
      render :new
    end
  end

  def destroy
    @user = User.find_by_session_token(session[:session_token])
    @user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end

  private

  def ensure_logged_out
    if logged_in?
      redirect_to bands_url
    end
  end
end
