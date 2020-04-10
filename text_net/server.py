from pygase import GameState, Backend
import common

PORT = 35000

initial_game_state = GameState(worldState={})

def time_step(game_state, dt):
    return "step"

def move(client, object, direction, game_state):
    game_state.worldState[object].move(direction)
    backend.server.dispatch_event("MOVE_RESPONSE", direction, target_client=client)

backend = Backend(initial_game_state, time_step, event_handlers={
    "MOVE": move
})

backend.run('localhost', PORT)