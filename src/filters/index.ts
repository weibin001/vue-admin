import dayjs from 'dayjs'

export const parseTime = (date?: Date, format = 'YYYY-MM-DD HH:mm:ss') => (date ? dayjs(date).format(format) : '---')
