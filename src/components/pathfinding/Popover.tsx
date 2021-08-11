import React from 'react';

import { Popover } from 'react-bootstrap';

/**
 * Basic popover explaining the different ways to calculate heuristic for A*
 */
export const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">A* Heuristic</Popover.Title>
    <Popover.Content>
      Different methods of calculating the heuristic in A*
      <ul>
        <li>
          <strong>Manhattan distance</strong>:
          <ul>
            <li>Guarantees shortest path.</li>
            <li>Trading speed for accuracy.</li>
          </ul>
        </li>
        <li>
          <strong>Fudge</strong>:
          <ul>
            <li>
              Similar to A* except that the heuristic favours nodes closer to
              the target.
            </li>
            <li>Finds a more direct route.</li>
            <li>Inadmissible heuristic.</li>
          </ul>
        </li>
        <li>
          <strong>Cross</strong>:
          <ul>
            <li>
              Prefers path that are along the straight line from the starting
              point to the target.
            </li>
            <li>Nicer diagonal paths.</li>
            <li>Inadmissible heuristic.</li>
          </ul>
        </li>
      </ul>
    </Popover.Content>
  </Popover>
);
