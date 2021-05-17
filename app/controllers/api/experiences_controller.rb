class Api::ExperiencesController < ApplicationController
  def index 
    @experiences = Experience.find_by(user_id: params[:user_id])
  end

  def create
    @experience = Experience.new(experience_params)

    if @experience.save
      render :show 
    else 
      render json: @experience.errors.full_messages, status: 400
    end
  end

  def destroy 
    @experience = Experience.find(params[:id])

    @experience.destroy 
    render :show
  end
  
  private 

  def experience_params
    params.require(:experience).permit(
      :user_id,
      :title,
      :employment_type,
      :company,
      :location,
      :start_date,
      :end_date,
      :industry,
      :headline,
      :description
    )
  end
end