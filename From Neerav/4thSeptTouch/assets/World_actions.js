var flwebgl;
(function (flwebgl) {
	(function (actions) {
		actions.sc_Scene321_1_0 = function() {//flwebgl.camera.getMainCamera().moveTo(new flwebgl.geom.Point(0, 210, 0.5));

var timeline = this;
var stageInstance = this;
stageInstance.global = stageInstance.global || {};
stageInstance.global.shakeCameraSteps = stageInstance.global.shakeCameraSteps || 0;
stageInstance.global.moveRadiusLimit = stageInstance.global.moveRadius || 800;
stageInstance.global.moveUpLimit = stageInstance.global.moveUpLimit || 2400;
stageInstance.global.hitTestThreshold = 5;
stageInstance.global.hitTestCount = stageInstance.global.hitTestCount || 0;
stageInstance.global.hitObject = stageInstance.global.hitObject || null;
stageInstance.global.removeScene1Listeners = stageInstance.global.removeScene1Listeners || false;
stageInstance.global.scene1Listeners = stageInstance.global.scene1Listeners || [];

			if(!stageInstance.global.enterFrameAttached) {
				
			var hoverListenerFunction = function(evt) {
						stageInstance.global.hitTestCount++;
						stageInstance.global.hitTestCount = stageInstance.global.hitTestCount%stageInstance.global.hitTestThreshold;
						if(stageInstance.global.hitTestCount === 0) {
						var origin = new flwebgl.geom.Point(0,1.65,0);
						var destination = new flwebgl.geom.Point(0,0,-1);
						var cameraMatrix = flwebgl.camera.getMainCamera().getCameraMatrix();
						var viewMatrix = new flwebgl.geom.Matrix(viewMat);
						viewMatrix = viewMatrix.invert();
						destination = viewMatrix.transformPoint(destination);
						origin = cameraMatrix.transformPoint(origin);
						destination = cameraMatrix.transformPoint(destination);
						var raycaster = new flwebgl.interactivity.RayCaster(0,player.getStage(),origin,destination);
						var intersectedObjects = raycaster.intersectObjects(player.getStage());
						var crosshair = player.getStage().getChildByName("crosshair");
						var loopCrosshair = false;
						if(stageInstance.global.intersectedObjects === undefined) {
							stageInstance.global.intersectedObjects = [];
							if(intersectedObjects.length > 0)
							{
								for(var i = 0; i < intersectedObjects.length; i++) {
									if(intersectedObjects[i].getObject().getName().indexOf("fruit") !== -1 || intersectedObjects[i].getObject().getName().indexOf("pots") !== -1) {
										if(intersectedObjects[i].getObject().getCurrentFrame() === 1) {
											intersectedObjects[i].getObject().gotoAndPlay("hover");
											stageInstance.global.intersectedObjects.push(intersectedObjects[i].getObject().getName());		
											loopCrosshair = true;
										}
									}
								}
							}
						} else {
								var numberOfObjectsIntersected = 0;
								for(var i = 0; i < stageInstance.global.intersectedObjects.length; i++) {
									var foundObject = false;
									for(var j = 0; j < intersectedObjects.length; j++) {
										if(intersectedObjects[j].getObject().getName() === stageInstance.global.intersectedObjects[i]) {
											foundObject = true;	
											numberOfObjectsIntersected++;
											break;
										}
									}
			
									if(!foundObject) {
										var theObject = player.getStage().getChildByName(stageInstance.global.intersectedObjects[i])
										if(theObject.getCurrentLabel() === "hover")
											theObject.gotoAndPlay(1);
										stageInstance.global.intersectedObjects.splice(i,1);
									}
								}

								if(numberOfObjectsIntersected > 0) {
									loopCrosshair = true;
								}
								
								for(var i = 0; i < intersectedObjects.length; i++) {
									if(intersectedObjects[i].getObject().getName().indexOf("fruit") !== -1 || intersectedObjects[i].getObject().getName().indexOf("pots") !== -1) {
										if(!stageInstance.global.intersectedObjects.includes(intersectedObjects[i].getObject().getName())) {
											if(intersectedObjects[i].getObject().getCurrentFrame() === 1) {
												intersectedObjects[i].getObject().gotoAndPlay("hover");
												stageInstance.global.intersectedObjects.push(intersectedObjects[i].getObject().getName());
												loopCrosshair = true;
											}
										}
									}
								}
						}
						
						if(crosshair !== undefined) {
							if(loopCrosshair) {
								if(crosshair.getCurrentFrame() === 1) {
									crosshair.gotoAndPlay("proceed");
								}							
							} else {
								crosshair.gotoAndStop(1);
							}
						}
					}
			};	
				
			
			var movementFunction = function(evt) {
				var removeSelf = false;
					self = this;

				document.onclick = function(e) {
									// same as h
									//Do rayvaster test
									var origin = new flwebgl.geom.Point(0,1.65,0);
									var destination = new flwebgl.geom.Point(0,0,-1);
									var cameraMatrix = flwebgl.camera.getMainCamera().getCameraMatrix();
									var viewMatrix = new flwebgl.geom.Matrix(viewMat);
									viewMatrix = viewMatrix.invert();
									destination = viewMatrix.transformPoint(destination);
									origin = cameraMatrix.transformPoint(origin);
									destination = cameraMatrix.transformPoint(destination);
									var raycaster = new flwebgl.interactivity.RayCaster(0,player.getStage(),origin,destination);
									var intersectedObjects = raycaster.intersectObjects(player.getStage());
									var wand = player.getStage().getChildByName("wandInstance");
									var hitAnObject = false;
									var hitCharacter = false;
									stageInstance.global.hitObject = null;
									if(intersectedObjects.length > 0)
									{
										for(var i = 0; i < intersectedObjects.length; i++) {
											if(intersectedObjects[i].getObject().getName().indexOf("fruit") !== -1 || intersectedObjects[i].getObject().getName().indexOf("pots") !== -1 || intersectedObjects[i].getObject().getName().indexOf("firey") !== -1 || intersectedObjects[i].getObject().getName().indexOf("firework") !== -1 || intersectedObjects[i].getObject().getName().indexOf("fly_hit_object") !== -1 || intersectedObjects[i].getObject().getName().indexOf("c_barrel") !== -1) {
												if(intersectedObjects[i].getObject().getCurrentLabel() !== "proceed" ) {
													stageInstance.global.hitObject = intersectedObjects[i].getObject();
													hitAnObject = true;
													if(intersectedObjects[i].getObject().getName().indexOf("firey") !== -1) {
														stageInstance.global.hitObject = intersectedObjects[i].getObject().getParent();
														hitCharacter = true;
													} else if(intersectedObjects[i].getObject().getName().indexOf("fly_hit_object") !== -1) {
														var c_fly_instance = stageInstance.getChildByName("c_fly_instance");
														if(c_fly_instance.getCurrentFrame() === 1) {
															hitCharacter = true;
															stageInstance.global.hitObject = c_fly_instance;
														}
													} else if(intersectedObjects[i].getObject().getName().indexOf("c_barrel") !== -1) {
														if(intersectedObjects[i].getObject().getCurrentFrame() === 1) {
															hitCharacter = true;
															stageInstance.global.hitObject = intersectedObjects[i].getObject();
														}
													}
												}
												break;
											}
										}
									}
									if(hitAnObject) {
										if(hitCharacter)
											wand.gotoAndPlay("characterInteraction");
										else
											wand.gotoAndPlay("objectInteraction");
									} else {
										wand.gotoAndPlay("noInteraction");
									}
								
							}


				document.onkeydown = function(e) {
					e = e || window.event;
					if (e.keyCode == '78') {
						// n
//						var c_firey = timeline.getChildByName("c_firey");
//						stageInstance.global.hitObject = c_firey;
//						timeline.getChildByName("door_basket").closeDoor();
//						var wand = player.getStage().getChildByName("wandInstance");
//						wand.gotoAndPlay("characterInteraction");
					}
					else if (e.keyCode == '87') {
						// w
							flwebgl.camera.getMainCamera().dolly(15);
							var camPos = flwebgl.camera.getMainCamera().getPosition();
							if(camPos.norm() > stageInstance.global.moveRadiusLimit)
							flwebgl.camera.getMainCamera().dolly(-15);
			
							if(stageInstance.global.isMainDoorOpen) {
								var cam = flwebgl.camera.getMainCamera().getCameraMatrix();
								var viewM = new flwebgl.geom.Matrix(viewMat);
								viewM.invert();
								cam = viewM.concat(cam);
								var player_pos = new flwebgl.geom.Point(cam.get(0,3),cam.get(1,3),cam.get(2,3));
								player_pos.y = 0;
								var player_dir = cam.transformPoint(new flwebgl.geom.Point(0,0,-1)).sub(cam.transformPoint(new flwebgl.geom.Point(0,0,0)));
								player_dir.y = 0;
								player_dir.normalize();
								var plane_n = player_dir.cross(new flwebgl.geom.Point(0,1,0));
								//var player_pos = stageInstance.global.sceneChangeObject.getPosition();
								//var player_dir = stageInstance.global.sceneChangeObject.getOrientation();
			
								//var angle = Math.abs(player_dir.angle(camera_dir));
			
								//if(angle < 30) 
								var dPos = stageInstance.global.sceneChangeObject.getPosition();
								dPos.y = 0;
								var dist =  Math.abs(plane_n.dot(dPos.sub(player_pos)));
								
							   if(dist < 800) {
									stageInstance.global.switchToScene2 = true;
									stageInstance.global.initialDistance = player_pos.distance(stageInstance.global.sceneChangeObject.getPosition());
								}
			
							}
					}
					else if (e.keyCode == '65') {
						// a
						flwebgl.camera.getMainCamera().truck(-15);
						var camPos = flwebgl.camera.getMainCamera().getPosition();
						if(camPos.norm() > stageInstance.global.moveRadiusLimit)
						flwebgl.camera.getMainCamera().truck(15);
					}
					else if (e.keyCode == '83') {
					   // s
						flwebgl.camera.getMainCamera().dolly(-15);
						var camPos = flwebgl.camera.getMainCamera().getPosition();
						if(camPos.norm() > stageInstance.global.moveRadiusLimit)
						flwebgl.camera.getMainCamera().dolly(15);
					}
					else if (e.keyCode == '68') {
					   // d
						flwebgl.camera.getMainCamera().truck(15);
						var camPos = flwebgl.camera.getMainCamera().getPosition();
						if(camPos.norm() > stageInstance.global.moveRadiusLimit)
						flwebgl.camera.getMainCamera().truck(-15);
					}
					else if (e.keyCode == '84') {
					   // t
						flwebgl.camera.getMainCamera().setTintRGB(0, 0, 192, 60);
					}
					else if (e.keyCode == '85') {
					   // u
						flwebgl.camera.getMainCamera().setTint(0x000C00, 0);
						//flwebgl.camera.getMainCamera().setTintRGB(0, 0, 192, 60);
					}
					else if (e.keyCode == '32') {
					   // l
						var offset = new flwebgl.geom.Point(0,15,0)
						flwebgl.camera.getMainCamera().moveBy(offset);
						var camPos = flwebgl.camera.getMainCamera().getPosition();
						if(camPos.y > stageInstance.global.moveUpLimit) {
							flwebgl.camera.getMainCamera().moveTo(new flwebgl.geom.Point(camPos.x,stageInstance.global.moveUpLimit,camPos.z));
						}
					}
					else if (e.keyCode == '69') {
					   // e
						//player.setScene("Scene 2");
					}		
					else if (e.keyCode == '86') {
						// v
						var offset = new flwebgl.geom.Point(0,-15,0)
						flwebgl.camera.getMainCamera().moveBy(offset);
						var camPos = flwebgl.camera.getMainCamera().getPosition();
						if(camPos.y < 0) {
							flwebgl.camera.getMainCamera().moveTo(new flwebgl.geom.Point(camPos.x,0,camPos.z));
						}
					}
					else if (e.keyCode == '72') {
						// h
						//Do rayvaster test
						var origin = new flwebgl.geom.Point(0,1.65,0);
						var destination = new flwebgl.geom.Point(0,0,-1);
						var cameraMatrix = flwebgl.camera.getMainCamera().getCameraMatrix();
						var viewMatrix = new flwebgl.geom.Matrix(viewMat);
						viewMatrix = viewMatrix.invert();
						destination = viewMatrix.transformPoint(destination);
						origin = cameraMatrix.transformPoint(origin);
						destination = cameraMatrix.transformPoint(destination);
						var raycaster = new flwebgl.interactivity.RayCaster(0,player.getStage(),origin,destination);
						var intersectedObjects = raycaster.intersectObjects(player.getStage());
						var wand = player.getStage().getChildByName("wandInstance");
						var hitAnObject = false;
						var hitCharacter = false;
						stageInstance.global.hitObject = null;
						if(intersectedObjects.length > 0)
						{
							for(var i = 0; i < intersectedObjects.length; i++) {
								if(intersectedObjects[i].getObject().getName().indexOf("fruit") !== -1 || intersectedObjects[i].getObject().getName().indexOf("pots") !== -1 || intersectedObjects[i].getObject().getName().indexOf("firey") !== -1 || intersectedObjects[i].getObject().getName().indexOf("firework") !== -1 ) {
									if(intersectedObjects[i].getObject().getCurrentLabel() !== "proceed" ) {
										stageInstance.global.hitObject = intersectedObjects[i].getObject();
										hitAnObject = true;
										if(intersectedObjects[i].getObject().getName().indexOf("firey") !== -1) {
											stageInstance.global.hitObject = intersectedObjects[i].getObject().getParent();
											hitCharacter = true;
										}
									}
									break;
								}
							}
						}
						if(hitAnObject) {
							if(hitCharacter)
								wand.gotoAndPlay("characterInteraction");
							else
								wand.gotoAndPlay("objectInteraction");
						} else {
							wand.gotoAndPlay("noInteraction");
						}
					}
				}
			
					if(stageInstance.global.switchToScene2) {
						var cam = flwebgl.camera.getMainCamera().getCameraMatrix();
						var cam_pos = new flwebgl.geom.Point(cam.get(0,3),cam.get(1,3),cam.get(2,3));
						var dir = stageInstance.global.sceneChangeObject.getPosition().sub(cam_pos);
						dir.normalize();
			
						var curDistance = cam_pos.distance(stageInstance.global.sceneChangeObject.getPosition());
						var percent = 100*(1-curDistance/stageInstance.global.initialDistance);
						percent *= percent;
						percent = Math.ceil(percent/100);
						var scaleF = 120*(percent)/100;
						if(scaleF < 30)
							scaleF = 30;
						dir.scale(scaleF);
						flwebgl.camera.getMainCamera().moveBy(dir);
			
						var clr = 0xEDA42C;	
						flwebgl.camera.getMainCamera().setTint(clr,percent);
						if((curDistance <= 120) && !stageInstance.global.switchedToScene2) {
							stageInstance.global.removeScene1Listeners = true;
							//removeSelf = true;
							stageInstance.global.switchedToScene2 = true;
							player.setBackgroundColor(0xEDA42C);
							//switchScene = true;
							player.setScene("Scene 2");
							//timeline.removeEventListener(flwebgl.events.Event.ENTER_FRAME,this);
						}
					}
			
                    if(stageInstance.global.shakeCameraSteps > 0) {

                        if(stageInstance.global.shakeCameraSteps == 2*stageInstance.global.stepsPerShake) {

                            stageInstance.global.newPosition = stageInstance.global.intialPosition.clone();

                            stageInstance.global.moveDist = stageInstance.global.newPosition.sub(flwebgl.camera.getMainCamera().getPosition());

                            stageInstance.global.moveDist.scale(1.0/stageInstance.global.stepsPerShake);

                        }else if((stageInstance.global.shakeCameraSteps % stageInstance.global.stepsPerShake) == 0)

                        {

                            var curPos = flwebgl.camera.getMainCamera().getPosition();

                            var p;

                            do { 

                                p = new flwebgl.geom.Point(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5);

                                p.normalize();

                                p.scale(stageInstance.global.stepDist);

                                p = p.add(curPos);

                            }while(stageInstance.global.intialPosition.distance(p) > stageInstance.global.shakeRadius);

                            stageInstance.global.newPosition = p;

                            stageInstance.global.moveDist = p.sub(curPos);

                            stageInstance.global.moveDist.scale(1.0/stageInstance.global.stepsPerShake);

                        }

                        

                        flwebgl.camera.getMainCamera().moveBy(stageInstance.global.moveDist);

                        --stageInstance.global.shakeCameraSteps;

                    }
				
				
				
			};
				
			var removeListenerFunction = function() {
				if(stageInstance.global.removeScene1Listeners) {
					for(var listenerItr = 0; listenerItr < stageInstance.global.scene1Listeners.length; listenerItr++) {
						stageInstance.removeEventListener(flwebgl.events.Event.ENTER_FRAME, stageInstance.global.scene1Listeners[listenerItr]);
					}
					for(var listenerItr = 0; listenerItr < stageInstance.global.scene1Listeners.length; listenerItr++) {
						stageInstance.removeEventListener(flwebgl.events.Event.EXIT_FRAME, stageInstance.global.scene1Listeners[listenerItr]);
					}
				}
			};
			
			timeline.addEventListener(flwebgl.events.Event.ENTER_FRAME, movementFunction);
			stageInstance.global.scene1Listeners.push(movementFunction);
			
			timeline.addEventListener(flwebgl.events.Event.ENTER_FRAME, hoverListenerFunction);
			stageInstance.global.scene1Listeners.push(hoverListenerFunction);
			
			timeline.addEventListener(flwebgl.events.Event.EXIT_FRAME, removeListenerFunction);
			stageInstance.global.scene1Listeners.push(removeListenerFunction);
			
			}
		}
		actions.sc_Scene321_3_0 = function() {
			var stageInstance = player.getStage();
			stageInstance.global = stageInstance.global || {};
			stageInstance.global.sceneChangeObject = stageInstance.getChildByName("door_location");
			stageInstance.global.sceneChangeObject.setVisible(false);
			
			stageInstance.global.sceneChangeApproach2 = true;
		}
		actions.sc_Scene321_31_0 = function() {
			var stageInstance = this;
			stageInstance.global = stageInstance.global || {};
			
			if(!stageInstance.global.smoke_inst_2) {
				stageInstance.global.smoke_inst_2 = stageInstance.getChildByName("smoke_instance_2");
				stageInstance.global.smoke_inst_2.gotoAndPlay(15);
			}
			if(!stageInstance.global.smoke_inst_3) {
				stageInstance.global.smoke_inst_3 = stageInstance.getChildByName("smoke_instance_3");
				stageInstance.global.smoke_inst_3.gotoAndPlay(30);
			}
			if(!stageInstance.global.smoke2_inst_2) {
				stageInstance.global.smoke2_inst_2 = stageInstance.getChildByName("smoke2_2");
				stageInstance.global.smoke2_inst_2.gotoAndPlay(15);
			}
			if(!stageInstance.global.smoke2_inst_3) {
				stageInstance.global.smoke2_inst_3 = stageInstance.getChildByName("smoke2_3");
				stageInstance.global.smoke2_inst_3.gotoAndPlay(30);
			}
			
		}
		actions.sc_Scene321_53_0 = function() {
			var stageInstance = this;
			stageInstance.global = stageInstance.global || {};
			
			stageInstance.global.cameraFinalAngle = stageInstance.global.cameraFinalAngle || 0;
			stageInstance.global.cameraAngleSweep = stageInstance.global.cameraAngleSweep || -90;
			stageInstance.global.cameraInitialRadius = stageInstance.global.cameraInitialRadius || 2800;
			stageInstance.global.cameraInitialY = stageInstance.global.cameraInitialY || 2800;
			
			if(!stageInstance.global.rotationMat) {
			              stageInstance.global.rotationMat = new flwebgl.geom.Matrix();
			              stageInstance.global.rotationMat.rotateY(10);
			}
			
			if(!stageInstance.global.cameraNumFrames) {
			              var ang = stageInstance.global.cameraAngleSweep/180*Math.PI;
			              var r = stageInstance.global.cameraInitialRadius;
			              var y = stageInstance.global.cameraInitialY;
			              var p = new flwebgl.geom.Point(Math.cos(ang)*r,y,Math.sin(ang)*r);
			              var dir = new flwebgl.geom.Point(-p.x,0,-p.z);
			              flwebgl.camera.getMainCamera().moveTo(p);
			              dir = stageInstance.global.rotationMat.transformPoint(dir);
			              flwebgl.camera.getMainCamera().lookInDirection(dir);
			}
			
			if(!stageInstance.global.enterFrameAttached) {
			stageInstance.addEventListener(flwebgl.events.Event.ENTER_FRAME, function(evt) {
			                            if(!stageInstance.global.cameraSettled) {
			
			                                          var refAxis = new flwebgl.geom.Point(0, 0, -1);
			
			                                          if(!stageInstance.global.cameraNumFrames) {
			                                                        stageInstance.global.cameraNumFrames = 200;
			                                                        stageInstance.global.cameraCurrentFrame = 1;
			                                          }
			                                          var frac = (stageInstance.global.cameraNumFrames - stageInstance.global.cameraCurrentFrame)/stageInstance.global.cameraNumFrames;
			                                          var ang = stageInstance.global.cameraAngleSweep/180*Math.PI;
			                                          ang = ang*frac;
			                                          var r = stageInstance.global.cameraInitialRadius;
			                                          var y = stageInstance.global.cameraInitialY;
			                                          var p = new flwebgl.geom.Point(Math.cos(ang)*r,y,Math.sin(ang)*r);
			                                          var dir = new flwebgl.geom.Point(-p.x,0,-p.z);
			                                          
			                                          p.x = p.x*frac;
			                                          p.z = p.z*frac;
			                                          p.y = p.y*frac;
			
			                                          flwebgl.camera.getMainCamera().moveTo(p);
			                                          dir = stageInstance.global.rotationMat.transformPoint(dir);
			                            flwebgl.camera.getMainCamera().lookInDirection(dir/*stageInstance.global.cameraDirection*/);
			                                          ++stageInstance.global.cameraCurrentFrame;
			                                          if(stageInstance.global.cameraCurrentFrame == stageInstance.global.cameraNumFrames)
			                                                        stageInstance.global.cameraSettled = true;
			
			                            }             
			              });
			}
			
		}
		actions.sc_Scene321_54_0 = function() {
			var stageInstance = this;
			stageInstance.global = stageInstance.global || {};
			
		}
		actions.sc_Scene321_55_0 = function() {
			var stageInstance = this;
			stageInstance.global = stageInstance.global || {};
			stageInstance.global.enterFrameAttached = true;
		}
		actions.sc_Scene322_14_0 = function() {
			var stageInstance = this;
			
			var transition_clr = 0xEDA42C;
			var scene_2_bg_color = 0x272220;
			
			var finalPos = new flwebgl.geom.Point(0, 1425, 0.5);
			var dir = new flwebgl.geom.Point(0, 0, -20);
			var intialPos;
			var sceneTransitionSteps = 60;
			if(stageInstance.global.switchToScene2) {
				stageInstance.global.scene2TransitionSteps = sceneTransitionSteps;
				intialPos = finalPos.sub(dir.clone().scale(stageInstance.global.scene2TransitionSteps));
				
				flwebgl.camera.getMainCamera().init();
				flwebgl.camera.getMainCamera().moveTo(intialPos);
			}
			
			var stageInstance= this;
			var sceneChangeParent = stageInstance.getChildByName("scene2_transtition_parent");
			sceneChangeParent.setVisible(false);
			stageInstance.global.hitTestThreshold = 5;
			stageInstance.global.hitTestCount = stageInstance.global.hitTestCount || 0;
			stageInstance.global.hitObject = stageInstance.global.hitObject || null;
			
			var timeline = this;
						if(!stageInstance.global.enterFrameAttached2) {
			timeline.addEventListener(flwebgl.events.Event.ENTER_FRAME, function(evt) {
					if(stageInstance.global.switchToScene2 && stageInstance.global.scene2TransitionSteps > 0) {
						flwebgl.camera.getMainCamera().moveBy(dir);
						--stageInstance.global.scene2TransitionSteps;
						
						var percent = 100*(stageInstance.global.scene2TransitionSteps/sceneTransitionSteps);
						percent *= percent;
						percent = Math.ceil(percent/100);
						if(percent == 0)
							player.setBackgroundColor(scene_2_bg_color);
						flwebgl.camera.getMainCamera().setTint(transition_clr,percent);
			
			
					} else {
						stageInstance.global.switchToScene2 = false;
				document.onkeydown = function(e) {
					e = e || window.event;
					if (e.keyCode == '87') {
						// w
						flwebgl.camera.getMainCamera().dolly(15);
					}
					else if (e.keyCode == '65') {
						// a
						flwebgl.camera.getMainCamera().truck(-15);
					}
					else if (e.keyCode == '83') {
					   // s
						flwebgl.camera.getMainCamera().dolly(-15);
					}
					else if (e.keyCode == '68') {
					   // d
						flwebgl.camera.getMainCamera().truck(15);
					}
					else if (e.keyCode == '84') {
					   // t
						flwebgl.camera.getMainCamera().setTintRGB(0, 0, 192, 60);
					}
					else if (e.keyCode == '85') {
						// u
						//flwebgl.camera.getMainCamera().setTint(0x000C00, 0);
						//flwebgl.camera.getMainCamera().setTintRGB(0, 0, 192, 60);
					}
					else if (e.keyCode == '32') {
					   // l
						var offset = new flwebgl.geom.Point(0,15,0)
						flwebgl.camera.getMainCamera().moveBy(offset);
					}
					else if (e.keyCode == '86') {
						// v
						var offset = new flwebgl.geom.Point(0,-15,0)
						flwebgl.camera.getMainCamera().moveBy(offset);
					}
					else if (e.keyCode == '80') {
					   // q
						player.setScene("Scene 1");
					}		
					else if (e.keyCode == '72') {
						// h
						//Do rayvaster test
						var origin = new flwebgl.geom.Point(0,1.65,0);
						var destination = new flwebgl.geom.Point(0,0,-1);
						var cameraMatrix = flwebgl.camera.getMainCamera().getCameraMatrix();
						var viewMatrix = new flwebgl.geom.Matrix(viewMat);
						viewMatrix = viewMatrix.invert();
						destination = viewMatrix.transformPoint(destination);
						origin = cameraMatrix.transformPoint(origin);
						destination = cameraMatrix.transformPoint(destination);
						var raycaster = new flwebgl.interactivity.RayCaster(0,player.getStage(),origin,destination);
						var intersectedObjects = raycaster.intersectObjects(player.getStage());
						var wand = player.getStage().getChildByName("wandInstance");
						var hitAnObject = false;
						stageInstance.global.hitObject = null;
						if(intersectedObjects.length > 0)
						{
							for(var i = 0; i < intersectedObjects.length; i++) {
								if(intersectedObjects[i].getObject().getName().indexOf("animated") !== -1 || intersectedObjects[i].getObject().getName().indexOf("flame") !== -1) {
									if(intersectedObjects[i].getObject().getCurrentLabel() !== "proceed" ) {
										stageInstance.global.hitObject = intersectedObjects[i].getObject();
										hitAnObject = true;
									}
									break;
								}
							}
						}
						if(hitAnObject) {
							wand.gotoAndPlay("objectInteraction");
						} else {
							wand.gotoAndPlay("noInteraction");
						}
					}
				}
			}
			});
						timeline.addEventListener(flwebgl.events.Event.ENTER_FRAME, function(evt) {
									stageInstance.global.hitTestCount++;
									stageInstance.global.hitTestCount = stageInstance.global.hitTestCount%stageInstance.global.hitTestThreshold;
									if(stageInstance.global.hitTestCount === 0) {
									var origin = new flwebgl.geom.Point(0,1.65,0);
									var destination = new flwebgl.geom.Point(0,0,-1);
									var cameraMatrix = flwebgl.camera.getMainCamera().getCameraMatrix();
									var viewMatrix = new flwebgl.geom.Matrix(viewMat);
									viewMatrix = viewMatrix.invert();
									destination = viewMatrix.transformPoint(destination);
									origin = cameraMatrix.transformPoint(origin);
									destination = cameraMatrix.transformPoint(destination);
									var raycaster = new flwebgl.interactivity.RayCaster(0,player.getStage(),origin,destination);
									var intersectedObjects = raycaster.intersectObjects(player.getStage());
						var crosshair = player.getStage().getChildByName("crosshair");
						var loopCrosshair = false;
									if(stageInstance.global.intersectedObjects === undefined) {
										stageInstance.global.intersectedObjects = [];
										if(intersectedObjects.length > 0)
										{
											for(var i = 0; i < intersectedObjects.length; i++) {
												if(intersectedObjects[i].getObject().getName().indexOf("animated") !== -1) {
													if(intersectedObjects[i].getObject().getCurrentFrame() === 1) {
														intersectedObjects[i].getObject().gotoAndPlay("hover");
														stageInstance.global.intersectedObjects.push(intersectedObjects[i].getObject().getName());
											loopCrosshair = true;
													}
												}
											}
										}
									} else {
								var numberOfObjectsIntersected = 0;
											for(var i = 0; i < stageInstance.global.intersectedObjects.length; i++) {
												var foundObject = false;
												for(var j = 0; j < intersectedObjects.length; j++) {
													if(intersectedObjects[j].getObject().getName() === stageInstance.global.intersectedObjects[i]) {
														foundObject = true;
											numberOfObjectsIntersected++;
														break;
													}
												}
						
												if(!foundObject) {
													var theObject = player.getStage().getChildByName(stageInstance.global.intersectedObjects[i])
													if(theObject.getCurrentLabel() === "hover")
														theObject.gotoAndPlay(1);
													stageInstance.global.intersectedObjects.splice(i,1);
												}
											}

								if(numberOfObjectsIntersected > 0) {
									loopCrosshair = true;
								}
								
											for(var i = 0; i < intersectedObjects.length; i++) {
												if(intersectedObjects[i].getObject().getName().indexOf("animated") !== -1) {
													if(!stageInstance.global.intersectedObjects.includes(intersectedObjects[i].getObject().getName())) {
														if(intersectedObjects[i].getObject().getCurrentFrame() === 1) {
															intersectedObjects[i].getObject().gotoAndPlay("hover");
															stageInstance.global.intersectedObjects.push(intersectedObjects[i].getObject().getName());
												loopCrosshair = true;
											}
														}
													}
												}
											}
						
						if(crosshair !== undefined) {
							if(loopCrosshair) {
								if(crosshair.getCurrentFrame() === 1) {
									crosshair.gotoAndPlay("proceed");
								}							
							} else {
								crosshair.gotoAndStop(1);
									}
								}
                            }
						});
									}
						stageInstance.global.enterFrameAttached2 = true;
		}
		actions.mc_Animation95Inside95Vase_0_0 = function() {
			this.stop()
		}
		actions.mc_Animation95Inside95Vase_0_35 = function() {
			this.gotoAndPlay(2);
		}
		actions.mc_Animation95Inside95Vase_0_59 = function() {
			this.stop()
		}
		actions.mc_Flame_0_61 = function() {
			this.gotoAndPlay("idle");
		}
		actions.mc_Flame_0_211 = function() {
			this.gotoAndPlay("idle");
		}
		actions.mc_Light95Swing_0_0 = function() {
			this.stop();
		}
		actions.mc_crosshair_0_0 = function() {
			this.stop();
		}
		actions.mc_Wands47WandObject_0_0 = function() {
			this.stop();
		}
		actions.mc_Wands47WandObject_0_42 = function() {
			this.gotoAndStop(1);
		}
		actions.mc_Wands47WandObject_0_84 = function() {
			var stageInstance = stageInstance || player.getStage();
			if(stageInstance.global.hitObject !== undefined && stageInstance.global.hitObject !== null) {
				if(stageInstance.global.shakeCameraSteps == 0) {
					stageInstance.global.intialPosition = flwebgl.camera.getMainCamera().getPosition();
					stageInstance.global.newPosition = stageInstance.global.intialPosition.clone();
					stageInstance.global.shakeCameraSteps = 24;
					stageInstance.global.stepsPerShake = 4;
					stageInstance.global.shakeRadius = 200;
					stageInstance.global.stepDist = 50;
				}else {
					stageInstance.global.shakeCameraSteps += Math.floor((24 - stageInstance.global.shakeCameraSteps)/stageInstance.global.stepsPerShake)*stageInstance.global.stepsPerShake; 
				}
			}
		}
		actions.mc_Wands47WandObject_0_87 = function() {
			var stageInstance = stageInstance || player.getStage();
			if(stageInstance.global.hitObject !== undefined && stageInstance.global.hitObject !== null) {
				if(stageInstance.global.hitObject.getName() === "c_firey") {
					stageInstance.global.hitObject.gotoAndPlay(38);
					var firey = stageInstance.global.hitObject.getChildByName("firey");
					firey.gotoAndPlay("proceed");
				}
			}
			
		}
		actions.mc_Wands47WandObject_0_115 = function() {
			this.gotoAndStop(1);
		}
		actions.mc_Wands47WandObject_0_151 = function() {
			var stageInstance = stageInstance || player.getStage();
			if(stageInstance.global.hitObject !== undefined && stageInstance.global.hitObject !== null) {
				if(stageInstance.global.shakeCameraSteps == 0) {
					stageInstance.global.intialPosition = flwebgl.camera.getMainCamera().getPosition();
					stageInstance.global.newPosition = stageInstance.global.intialPosition.clone();
					stageInstance.global.shakeCameraSteps = 24;
					stageInstance.global.stepsPerShake = 4;
					stageInstance.global.shakeRadius = 200;
					stageInstance.global.stepDist = 50;
				}else {
					stageInstance.global.shakeCameraSteps += Math.floor((24 - stageInstance.global.shakeCameraSteps)/stageInstance.global.stepsPerShake)*stageInstance.global.stepsPerShake; 
				}
			}
		}
		actions.mc_Wands47WandObject_0_154 = function() {
			var stageInstance = stageInstance || player.getStage();
			if(stageInstance.global.hitObject !== undefined && stageInstance.global.hitObject !== null) {
				stageInstance.global.hitObject.gotoAndPlay("proceed");
			}
		}
		actions.mc_Wands47WandObject_0_188 = function() {
			this.gotoAndStop(1);
		}
		actions.mc_Firework_0_0 = function() {
			this.stop()
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47AnimatedPots_1_0 = function() {
			this.stop()
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47AnimatedPots_1_45 = function() {
			this.gotoAndPlay(2);
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47AnimatedPots_1_129 = function() {
			this.stop()
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47Fruit95with95Animation_1_0 = function() {
			this.stop()
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47Fruit95with95Animation_1_35 = function() {
			this.gotoAndPlay(2);
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Other95FG95Props47Fruit95with95Animation_1_130 = function() {
			this.stop()
		}
		actions.mc_door95pulley47door95pulley47door95pulley95animation_10_0 = function() {
			
			this.isDoorOpen = function() {
				if(this.getCurrentLabel() == "closed_door" || this.getCurrentLabel() =="close_door_anim")
					return false;
				return  true;	
				//return true;
			}
			
			this.isDoorClosed = function() {
				if(this.getCurrentLabel() == "opened_door" || this.getCurrentLabel() =="open_door_anim")
					return false;
				return true;
			}
			
			this.openDoor = function() {
				if(!this.isDoorOpen())
					this.gotoAndPlay("open_door_anim");
			}
			
			this.closeDoor = function() {
				if(!this.isDoorClosed())	
					this.gotoAndPlay("close_door_anim");
			}
			
			
		}
		actions.mc_door95pulley47door95pulley47door95pulley95animation_10_21 = function() {
			 this.gotoAndPlay("closed_door");
		}
		actions.mc_door95pulley47door95pulley47door95pulley95animation_10_66 = function() {
			this.gotoAndPlay("opened_door");
		}
		actions.mc_door95pulley47door95pulley47door95pulley95animation_10_91 = function() {
			this.gotoAndPlay("closed_door");
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47c95Firey_0_36 = function() {
			var timeline = this;
			timeline.gotoAndPlay(1);
			
			
			
			
			
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47c95Firey_0_84 = function() {
			var firey = this.getChildByName("firey");
			firey.gotoAndPlay("jump");
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47c95Firey_0_113 = function() {
			var stage = player.getStage();		
			stage.getChildByName("door_basket").openDoor();
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47c95Firey_0_150 = function() {
			var stageInstance = player.getStage();
			stageInstance.global = stageInstance.global || {};
			
			if(stageInstance.global.sceneChangeApproach2 && !stageInstance.global.isMainDoorOpen) {
				stageInstance.global.isMainDoorOpen = true;
				var cam = flwebgl.camera.getMainCamera().getCameraMatrix();
				stageInstance.global.initialPlayerPostiion = new flwebgl.geom.Point(cam.get(0,3),cam.get(1,3),cam.get(2,3));
			}
			
			this.gotoAndPlay(136);
			
			/*var stageInstance = player.getStage();
			var sceneChangeParent = stageInstance.getChildByName("scene_change_instance");
			var sceneChangeChild = sceneChangeParent.getChildByName("scene_switcher_instance");
			sceneChangeParent.gotoAndPlay(2);
			flwebgl.camera.getMainCamera().attachToObject(sceneChangeParent ,new flwebgl.geom.Point(0,0,50),new flwebgl.geom.Point(0,0,1));
			flwebgl.camera.getMainCamera().attachToObject(sceneChangeChild ,new flwebgl.geom.Point(0,0,50),new flwebgl.geom.Point(0,0,1));
			*/
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47Fire45y45inPlace_0_35 = function() {
			this.gotoAndPlay("idle_begin");
		}
		actions.mc_Color95BG9502c95Resized95Optimized46psd32Asset47Characters47Fire45y45inPlace_0_151 = function() {
			this.gotoAndPlay("idle_end");
		}
	})(flwebgl.actions || (flwebgl.actions = {}));
})(flwebgl || (flwebgl = {}));
