import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	rate: ['nothing']
}

export const getRate = createAsyncThunk(
	'rateVideo/getRate',
	async (button, { rejectWithValue, dispatch }) => {
		// await получение массива оценок конкретного видео от пользователя
		dispatch(showRate())
	}
)

export const rateVideoSlice = createSlice({
	name: 'rateVideo',
	initialState,
	reducers: {
		setRate: (state, action) => {
			// на кнопках like и dislike будет отправка в стейт соответствующего значения
			state.rate = state.rate.push(action.payload)
		},
		showRate: state => {
			state.rate.reduce(
				(state, rate) => (rate === state ? 'nothing' : rate),
				'nothing'
			)
		}
	},
	extraReducers: {
		[getRate.fulfilled]: () => console.log('rate: fulfilled'),
		[getRate.pending]: () => console.log('rate: pending'),
		[getRate.rejected]: () => console.log('rate: rejected')
	}
})

export const { setRate, showRate } = rateVideoSlice.actions
export default rateVideoSlice.reducer
