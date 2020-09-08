import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPics } from "./api";
import { getNewPics } from "../modules/sample";

const useFetch = (member) => {
  const pics_data = useSelector((state) => state.sample.pics_data)
  const dispatch = useDispatch()

  let payload;
  
  if(member) {
    payload = {
      page:1,
      member,
    }
  } else {
    payload = {
      page: pics_data.page + 1,
      member: pics_data.member
    }
  }

  const fetchItems = async () => {
    if(member) {
      dispatch(getNewPics(payload))
    } else {
      dispatch(getPics(payload))
    }
  } 

  useEffect(() => {
    fetchItems()
  }, [])
}

export default useFetch