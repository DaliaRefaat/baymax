<x-mail::message>
# Appointment

  Hi , {{$toUser}} <br>
  {{$message}} with  {{$withUser}}

  Will Start in {{$start_Time}}

{{--<x-mail::button :url="'https://google.com'">--}}
{{--Button Text--}}
{{--</x-mail::button>--}}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
