import { ajax } from '../lib/ajax'

export const roomApi = {
  async createRoom(createMeetingRoomDto: CreateMeetingRoomDto) {
    return ajax.post<string>('/meeting-room/create', createMeetingRoomDto)
      .then(res => res.data)
  },
  async updateRoom(updateMeetingRoomDto: UpdateMeetingRoomDto) {
    return ajax.put<string>('/meeting-room/update', updateMeetingRoomDto)
      .then(res => res.data)
  },
  async deleteRoom(id: number) {
    return ajax.delete<string>(`/meeting-room/${id}`)
      .then(res => res.data)
  },
  async findRooms(roomsSearchParam: RoomsSearchParam) {
    return ajax.get<RoomsListResponse>('/meeting-room/list', { params: roomsSearchParam })
      .then(res => res.data)
  },
  async getRoomDetail(id: string) {
    return ajax.get<RoomVO>(`/meeting-room/${id}`).then(res => res.data)
  },
}
