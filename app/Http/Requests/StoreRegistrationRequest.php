<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name'   => ['required', 'string', 'max:100'],
            'last_name'    => ['required', 'string', 'max:100'],
            'email'        => ['required', 'email', 'unique:registrations,email'],
            'organisation' => ['required', 'string', 'max:200'],
            'country'      => ['required', 'string', 'max:100'],
            'phone'        => ['nullable', 'string', 'max:30'],
            'reg_type'     => ['required', 'string', 'in:delegate,exhibitor,media,student,government'],
            'dietary'      => ['nullable', 'string', 'max:200'],
            'hotel'        => ['nullable', 'string', 'max:200'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique'   => 'This email address is already registered.',
            'reg_type.in'    => 'Please select a valid registration type.',
        ];
    }
}
