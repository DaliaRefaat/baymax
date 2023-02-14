<x-mail::message>
# Appointment

  Hi , {{$toUser}} <br>
  {{$message}} with  {{$withUser}}

  Will Start in {{$start_Time}}
<x-mail::button :url="{{$link}}">
Go To Meeting
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
