<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Setting;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        
        $allow_duplicates = Setting::select('value')->where('param', 'allow_duplicates')->first();
        
        if($this->isMethod('post'))
        {
            return [
                'label' => $allow_duplicates->value == "0" ? ['required', 'unique:tasks']: ['required'],
            ];
        }

        return [
            'label' => $allow_duplicates->value == "0" ? ['required', Rule::unique('tasks')->ignore($this->route('id'))]: ['required'],
        ];
        
    }
}
