class Api::EducationsController < ApplicationController
  def index 
    @educations = Education.find_by(user_id: params[:user_id])
  end

  def create
    @education = Education.new(education_params)

    if @education.save
      render :show 
    else 
      render json: @education.errors.full_messages, status: 400
    end
  end

  def destroy 
    @education = Education.find(params[:id])

    @education.destroy 
    render :show
  end
  
  private 

  def education_params
    params.require(:education).permit(
      :user_id,
      :school,
      :degree,
      :field,
      :start_year,
      :end_year,
      :grade,
      :activities,
      :description
    )
  end
end