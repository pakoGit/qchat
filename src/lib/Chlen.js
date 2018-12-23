import Matter from "matter-js";

const Chlen = function (canvasId) {
    const canvas_width = 320;
    const canvas_height = 240;
    const spriteMaxCount = 40;//50
    let spriteCount = 0;

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    const engine = Engine.create(),
        world = engine.world;

    // create renderer
    const render = Render.create({
        element: document.getElementById(canvasId) || document.body,
        engine: engine,
        options: {
            //width: 800,
            //height: 600,
            wireframeBackground: 'transparent',
            background: 'transparent',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var offset = 10,
        options = {
            render: {
                opacity: 0
            },
            isStatic: true
        };

    world.bodies = [];

    // these static walls will not be rendered in this sprites example, see options
    World.add(world, [
        // Bodies.rectangle(canvas_width/2, 0, canvas_width + 2 * offset, 10.5, options),
        // Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        // Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
        // Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
        Bodies.rectangle(canvas_width / 2, 0 - offset, canvas_width + 2 * offset, 51, options),
        Bodies.rectangle(canvas_width / 2, canvas_height + offset, canvas_width + 2 * offset, 51, options),
        Bodies.rectangle(canvas_width + offset, canvas_height / 2 + 2 * offset, 51, canvas_height, options),
        Bodies.rectangle(-offset, canvas_height / 2 + 2 * offset, 51, canvas_height, options)
    ]);

    // var stack = Composites.stack(20, 20, 10, 4, 0, 0, function (x, y) {
    //     if (Common.random() > 0.35) {
    //         return Bodies.rectangle(x, y, 32, 32, {
    //             render: {
    //                 strokeStyle: '#ffffff',
    //                 sprite: {
    //                     xScale: 0.5,
    //                     yScale: 0.5,
    //                     texture: './../assets/pepega_snow.png'
    //                 }
    //             }
    //         });
    //     } else {
    //         return Bodies.circle(x, y, 46, {
    //             //density: 0.0005,
    //             mass: 100,
    //             frictionAir: 0.06,
    //             restitution: 0.8,
    //             friction: 0,
    //             render: {
    //                 sprite: {
    //                     texture: './../assets/gachi.png'
    //                 }
    //             }
    //         });
    //     }
    // });

    // let pepega = Bodies.rectangle(offset + Common.random() * (canvas_width - 32 - offset), offset, 32, 32, {
    //     // density: 0.0005,
    //     // frictionAir: 0.06,
    //     // restitution: 0.3,
    //     // friction: 0.01,
    //     render: {
    //         strokeStyle: '#ffffff',
    //         sprite: {
    //             xScale: 0.5,
    //             yScale: 0.5,
    //             texture: './../assets/pepega_snow.png'
    //         }
    //     }
    // });

    // World.add(world, pepega);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: canvas_width, y: canvas_height }
    });

    const availableEmote = ["arrow", "pepega", "pepega_snow", "gachi", "dicks"];

    const spawn = (emnoteId = null) => {
        if (spriteCount >= spriteMaxCount)
            return;

        if (!emnoteId || !availableEmote.includes(emnoteId))
            emnoteId = availableEmote[Math.floor(Common.random() * 5)];

        let pepega = Bodies.rectangle(60 + Common.random() * (canvas_width - 32 - 60), offset, 32, 32, {
            // density: 0.0005,
            // frictionAir: 0.06,
            // restitution: 0.3,
            // friction: 0.01,
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    xScale: 0.5,
                    yScale: 0.5,
                    texture: `./../assets/${emnoteId}.png`
                }
            }
        });

        World.add(world, pepega);
        ++spriteCount;

        const jump = setInterval(() => {
            Matter.Body.setVelocity(pepega, Matter.Vector.create(Common.random() * 10 - 5, Math.min(Common.random() * -15, -5)))
            Matter.Body.setAngularVelocity(pepega, Common.random() * 0.5)
        }, 2000);

        setTimeout(() => { clearInterval(jump); World.remove(world, pepega); --spriteCount; }, 60000);
    }

    spawn();
    const eventHandler = (e) => {
        spawn(e.detail);
    };

    document.addEventListener("chat_spawn", eventHandler);

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        spawn,
        stop: function () {
            document.removeEventListener("chat_spawn", eventHandler);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

export default Chlen;