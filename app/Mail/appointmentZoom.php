<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class appointmentZoom extends Mailable
{
    use Queueable, SerializesModels;

  protected $toUser;
  protected $withUser;
  protected $start_Time;
  protected $message;
  protected $link;
  public function __construct(array $messageData)
  {
    $this->toUser=$messageData["toUser"];
    $this->withUser=$messageData["withUser"];
    $this->start_Time=$messageData["start_Time"];
    $this->message=$messageData["message"];
    $this->link=$messageData["link"];
  }
    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Appointment Zoom',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'emails.appointmentZoom',
          with:[
            'toUser'=>$this->toUser,
            'withUser'=>$this->withUser,
            'start_Time'=>$this->start_Time,
            'message'=>$this->message,
              'link'=>$this->link
          ] ,
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
