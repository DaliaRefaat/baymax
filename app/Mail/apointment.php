<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class apointment extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

  protected $toUser;
  protected $withUser;
  protected $start_Time;
  protected $message;
  public function __construct(array $messageData)
  {
    $this->toUser=$messageData["toUser"];
    $this->withUser=$messageData["withUser"];
    $this->start_Time=$messageData["start_Time"];
    $this->message=$messageData["message"];
  }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Apointment',
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
            markdown: 'emails.apointment',
            with:[
              'toUser'=>$this->toUser,
              'withUser'=>$this->withUser,
              'start_Time'=>$this->start_Time,
              'message'=>$this->message
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
