from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from typing import Dict, List

router = APIRouter()

# post_id 기준으로 연결된 WebSocket 연결 목록
active_connections: Dict[int, List[WebSocket]] = {}

@router.websocket("/ws/comments/{post_id}")
async def comment_ws(websocket: WebSocket, post_id: int):
    await websocket.accept()

    if post_id not in active_connections:
        active_connections[post_id] = []
    active_connections[post_id].append(websocket)

    try:
        while True:
            # 클라이언트 메시지를 무시하고 연결만 유지
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections[post_id].remove(websocket)