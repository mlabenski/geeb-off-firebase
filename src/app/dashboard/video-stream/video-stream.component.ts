import { Component, OnInit } from '@angular/core';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc'; // Add

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
  localStream: Stream;
  remoteCalls: any = [];

  ngOnInit() {
  }

  constructor(public agoraService: AngularAgoraRtcService) {
    this.agoraService.createClient();
  }

  public startCall() {
    //I'm going to change the '1000' to the actual game number that correlates!
    this.agoraService.client.join(null, '1000', null, (uid) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);
      this.localStream.setVideoProfile('720p_3');
      this.subscribeToStreams();
    }, function(err) {
      console.error("You arent high enough level noob! ", err)
    });
  }

  public subscribeToStreams() {
    this.localStream.on("accessAllowed", () => {
      console.log("accessAllowed");
    });
    //The user has denied access to the camera and mic :(
      this.localStream.on("accessDenied", () => {
        console.log("accessDenied");
      });

      // we in this bitch
      this.localStream.init(() => {
        console.log("getUserMedia successful");
        this.localStream.play('agora_local');
        this.agoraService.client.publish(this.localStream, function (err) {
          console.log("Publish local stream error: "+ err);
        });
        this.agoraService.client.on('stream_published', function (evt) {
          console.log("Publish to the stream successful");
        });
      }, function (err) {
        console.log("getUserMedia failed", err);
      });
      // Adding listeners
      this.agoraService.client.on('error', (err) => {
        console.log("Got error msg:", err.reason);
        if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
          this.agoraService.client.renewChannelKey("", () => {
            console.log("Renew channel key successfully");
          });
        }
      });

      this.agoraService.client.on('stream-added', (evt) => {
        const stream = evt.stream;
        this.agoraService.client.subscribe(stream, (err) => {
          console.log("Subscribe stream failed", err);
        });
      });

      this.agoraService.client.on('stream-removed', (evt) => {
        const stream = evt.stream;
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
        console.log(`Remote stream is removed ${stream.getId()}`);
      });

      this.agoraService.client.on('peer-leave', (evt) => {
        const stream = evt.stream;
        if (stream) {
          stream.stop();
          this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
          console.log(`${evt.uid} left from this channel`);
          //send a method that the user left (can we get their user id?)
        }
      });
    }
}
