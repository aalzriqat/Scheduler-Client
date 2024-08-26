import { api } from "../../utils";

// Action Types
const UPLOAD_SCHEDULE_REQUEST = "UPLOAD_SCHEDULE_REQUEST";
const UPLOAD_SCHEDULE_SUCCESS = "UPLOAD_SCHEDULE_SUCCESS";
const UPLOAD_SCHEDULE_FAIL = "UPLOAD_SCHEDULE_FAIL";
const UPLOAD_SCHEDULE_PROGRESS = "UPLOAD_SCHEDULE_PROGRESS"; // Progress added

const FETCH_ALL_SCHEDULES_REQUEST = "FETCH_ALL_SCHEDULES_REQUEST";
const FETCH_ALL_SCHEDULES_SUCCESS = "FETCH_ALL_SCHEDULES_SUCCESS";
const FETCH_ALL_SCHEDULES_FAIL = "FETCH_ALL_SCHEDULES_FAIL";

const FETCH_ALL_SWAPS_REQUEST = "FETCH_ALL_SWAPS_REQUEST";
const FETCH_ALL_SWAPS_SUCCESS = "FETCH_ALL_SWAPS_SUCCESS";
const FETCH_ALL_SWAPS_FAIL = "FETCH_ALL_SWAPS_FAIL";

const FETCH_RECEIVED_SWAPS_REQUEST = "FETCH_RECEIVED_SWAPS_REQUEST";
const FETCH_RECEIVED_SWAPS_SUCCESS = "FETCH_RECEIVED_SWAPS_SUCCESS";
const FETCH_RECEIVED_SWAPS_FAIL = "FETCH_RECEIVED_SWAPS_FAIL";

const FETCH_SENT_SWAPS_REQUEST = "FETCH_SENT_SWAPS_REQUEST";
const FETCH_SENT_SWAPS_SUCCESS = "FETCH_SENT_SWAPS_SUCCESS";
const FETCH_SENT_SWAPS_FAIL = "FETCH_SENT_SWAPS_FAIL";

const UPDATE_SWAP_STATUS_REQUEST = "UPDATE_SWAP_STATUS_REQUEST";
const UPDATE_SWAP_STATUS_SUCCESS = "UPDATE_SWAP_STATUS_SUCCESS";
const UPDATE_SWAP_STATUS_FAIL = "UPDATE_SWAP_STATUS_FAIL";

const REQUEST_SWAP_REQUEST = "REQUEST_SWAP_REQUEST";
const REQUEST_SWAP_SUCCESS = "REQUEST_SWAP_SUCCESS";
const REQUEST_SWAP_FAIL = "REQUEST_SWAP_FAIL";


const FETCH_APPROVED_SWAP_REQUESTS_REQUEST =
  "FETCH_APPROVED_SWAP_REQUESTS_REQUEST";
const FETCH_APPROVED_SWAP_REQUESTS_SUCCESS =
  "FETCH_APPROVED_SWAP_REQUESTS_SUCCESS";
const FETCH_APPROVED_SWAP_REQUESTS_FAIL = "FETCH_APPROVED_SWAP_REQUESTS_FAIL";


const CLEAR_UPLOAD_ERROR = "CLEAR_UPLOAD_ERROR";

// Upload Schedule Action
export const uploadSchedule = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_SCHEDULE_REQUEST });

    const { data } = await api.post("/schedules/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (event.total) {
          const progress = Math.round((event.loaded * 100) / event.total);
          
          dispatch({ type: UPLOAD_SCHEDULE_PROGRESS, payload: progress });
        }
      },
    });

    dispatch({ type: UPLOAD_SCHEDULE_SUCCESS, payload: data });
  } catch (error) {
    // Safely access the error message
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "An unknown error occurred.";
    dispatch({
      type: UPLOAD_SCHEDULE_FAIL,
      payload: errorMessage,
    });
  }
};

// Fetch All Schedules Action
export const fetchAllSchedules = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SCHEDULES_REQUEST });
    const { data } = await api.get("/schedules/all");
    dispatch({ type: FETCH_ALL_SCHEDULES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ALL_SCHEDULES_FAIL, payload: error.message });
  }
};

// Fetch All Schedules with Working Hours
export const fetchAllSchedulesWithWorkingHours = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SCHEDULES_REQUEST });

    const { data } = await api.get("/schedules/all-with-working-hours");
    dispatch({ type: FETCH_ALL_SCHEDULES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SCHEDULES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch All Swaps Action
export const fetchSwaps = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_SWAPS_REQUEST });

    const { data } = await api.get("/swap/swaps");
    dispatch({ type: FETCH_ALL_SWAPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_SWAPS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Received Swap Requests by a Specific User
export const fetchReceivedSwaps = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RECEIVED_SWAPS_REQUEST });

    const { data } = await api.get(`/swap/received/${userId}`);
    dispatch({ type: FETCH_RECEIVED_SWAPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_RECEIVED_SWAPS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Sent Swap Requests by a Specific User
export const fetchSentSwaps = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SENT_SWAPS_REQUEST });

    const { data } = await api.get(`/swap/sent/${userId}`);
    dispatch({ type: FETCH_SENT_SWAPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SENT_SWAPS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/// Update Swap Status Action
export const updateSwapStatus = (swapId, status, message, role, adminStatus) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SWAP_STATUS_REQUEST });

    const { data } = await api.put(`/swap/update/${swapId}`, {
      status,
      message,
      role,
      adminStatus,
    });

    dispatch({ type: UPDATE_SWAP_STATUS_SUCCESS, payload: data });
    dispatch(fetchAllSchedules()); 
  } catch (error) {
    dispatch({
      type: UPDATE_SWAP_STATUS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Request Schedule Swap Action
export const requestScheduleSwap = (swapId) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_SWAP_REQUEST });

    const { data } = await api.put(`/swap/request/${swapId}`);
    dispatch({ type: REQUEST_SWAP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REQUEST_SWAP_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Approved Swap Requests Action
export const fetchApprovedSwapRequests = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_APPROVED_SWAP_REQUESTS_REQUEST });

    const { data } = await api.get("/swap/approved-swaps");
    dispatch({ type: FETCH_APPROVED_SWAP_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_APPROVED_SWAP_REQUESTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Clear Upload Error Action
export const clearUploadError = () => (dispatch) => {
  dispatch({ type: CLEAR_UPLOAD_ERROR });
};

// Initial State
const initialState = {
  schedules: [],
  swaps: {
    received: [],
    sent: [],
    all: [],
    approved: [], 
  },
  loading: {
    upload: false,
    allSwaps: false,
    receivedSwaps: false,
    sentSwaps: false,
    updateSwap: false,
    requestSwap: false,
    allSchedules: false,
    approvedSwaps: false, 
  },
  uploadProgress: 0, 
  error: null,
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_SCHEDULE_REQUEST:
      return { ...state, loading: { ...state.loading, upload: true } };
    case UPLOAD_SCHEDULE_PROGRESS:
      return { ...state, uploadProgress: action.payload }; // Handling progress
    case UPLOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, upload: false },
        schedules: action.payload,
        uploadProgress: 0, // Reset progress after completion
      };
    case UPLOAD_SCHEDULE_FAIL:
      return {
        ...state,
        loading: { ...state.loading, upload: false },
        error: action.payload,
        uploadProgress: 0, // Reset progress on failure
      };

    case FETCH_ALL_SCHEDULES_REQUEST:
      return { ...state, loading: { ...state.loading, allSchedules: true } };
    case FETCH_ALL_SCHEDULES_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, allSchedules: false },
        schedules: action.payload,
      };
    case FETCH_ALL_SCHEDULES_FAIL:
      return {
        ...state,
        loading: { ...state.loading, allSchedules: false },
        error: action.payload,
      };

    case FETCH_ALL_SWAPS_REQUEST:
    case FETCH_RECEIVED_SWAPS_REQUEST:
    case FETCH_SENT_SWAPS_REQUEST:
      return { ...state, loading: { ...state.loading, allSwaps: true } };

    case FETCH_ALL_SWAPS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, allSwaps: false },
        swaps: { ...state.swaps, all: action.payload },
      };
    case FETCH_RECEIVED_SWAPS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, receivedSwaps: false },
        swaps: { ...state.swaps, received: action.payload },
      };
    case FETCH_SENT_SWAPS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, sentSwaps: false },
        swaps: { ...state.swaps, sent: action.payload },
      };

    case FETCH_ALL_SWAPS_FAIL:
    case FETCH_RECEIVED_SWAPS_FAIL:
    case FETCH_SENT_SWAPS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          allSwaps: false,
          receivedSwaps: false,
          sentSwaps: false,
        },
        error: action.payload,
      };

    case UPDATE_SWAP_STATUS_REQUEST:
      return { ...state, loading: { ...state.loading, updateSwap: true } };
    case UPDATE_SWAP_STATUS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, updateSwap: false },
        swaps: {
          ...state.swaps,
          received: state.swaps.received.map((swap) =>
            swap._id === action.payload._id ? action.payload : swap
          ),
          sent: state.swaps.sent.map((swap) =>
            swap._id === action.payload._id ? action.payload : swap
          ),
        },
      };
    case UPDATE_SWAP_STATUS_FAIL:
      return {
        ...state,
        loading: { ...state.loading, updateSwap: false },
        error: action.payload,
      };

    case REQUEST_SWAP_REQUEST:
      return { ...state, loading: { ...state.loading, requestSwap: true } };
    case REQUEST_SWAP_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, requestSwap: false },
        swaps: {
          ...state.swaps,
          sent: [...state.swaps.sent, action.payload],
        },
      };
    case REQUEST_SWAP_FAIL:
      return {
        ...state,
        loading: { ...state.loading, requestSwap: false },
        error: action.payload,
      };

    // Handling approved swap requests
    case FETCH_APPROVED_SWAP_REQUESTS_REQUEST:
      return { ...state, loading: { ...state.loading, approvedSwaps: true } };
    case FETCH_APPROVED_SWAP_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, approvedSwaps: false },
        swaps: { ...state.swaps, approved: action.payload },
      };
    case FETCH_APPROVED_SWAP_REQUESTS_FAIL:
      return {
        ...state,
        loading: { ...state.loading, approvedSwaps: false },
        error: action.payload,
      };

    // Handle clearing upload error
    case CLEAR_UPLOAD_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}