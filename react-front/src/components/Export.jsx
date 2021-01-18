import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Export({name="export"}) {
  return <button className="btn btn-default">{name}</button>
}