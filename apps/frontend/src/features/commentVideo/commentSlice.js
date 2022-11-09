import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	commentText: ''
	// функция возврата массива комментариев
	// commentList: async () => {await result.data: []}
}

export const postComment = createAsyncThunk(
	'comment/setComment',
	async (textareaText, { rejectWithValue, dispatch }) => {
		// await
		dispatch(setComment(textareaText))
	}
)

// // нужен ли экшн при получении списка комментов с сервера
// export const getCommentList = createAsyncThunk(
// 	'comment/getComment',
// 	async (_, { rejectedWithValue, dispatch }) => {
// 		// await
// 	}
// )

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		setComment: (state, action) => {
			state.commentText = action.payload
		}
	},
	extraReducers: {
		[postComment.fulfilled]: () => console.log('setComment: fulfilled'),
		[postComment.pending]: () => console.log('setComment: pending'),
		[postComment.rejected]: () => console.log('setComment: rejected')
		// [getCommentList.fulfilled]: () => console.log('getCommentList: fulfilled'),
		// [getCommentList.pending]: () => console.log('getCommentList: pending'),
		// [getCommentList.fulfilled]: () => console.log('getCommentList: rejected')
	}
})

export const { setComment } = commentSlice.actions
export default commentSlice.reducer
