import React from 'react'
import moment from 'moment/moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { TrashIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../../features/channelSlice'
import { deleteMessage } from '../../api/index'
const Message = ({message,timeStamp,name,email,photo,serverName}) => {
const [user] = useAuthState(auth)
const channelName = useSelector(selectChannelName)
const id = useSelector(selectChannelId)
const handleClick = async () =>{
    try {
console.log("Server Name: "+serverName + " channel name: "+ channelName + " id: "+id);

        await deleteMessage("testServer1",channelName,id)
    } catch (error) {
        console.log(error.message);
    }
}
  return (
    
   <>
    <div className='flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353b] group'>
        <img src={photo} alt='' className='h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl' />
        <div className='flex  flex-col'>
            <h4 className='flex items-center space-x-2 font-medium'>
                <span className='hover:underline text-white text-sm cursor-pointer'>{name}</span>
                <span className='text-[#72767b] text-xs'>{moment(timeStamp?.toDate().getTime()).format('lll')}</span>
            </h4>
            <p className='text-sm text-[#dcddde]'>{message}</p>
           
        </div>
        {user?.email===email && (
                <div className='hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer' onClick={handleClick}>
                    <TrashIcon className='h-5 hidden group-hover:inline '/>
                </div>
            )}
    </div>
   </>
  )
}

export default Message