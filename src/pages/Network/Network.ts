import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage } from '../Main/Main';
import * as d3 from "d3";


var graph: any = {
  "nodes": [
    { "id": "Joscha", "group": 1 },
    { "id": "Pascal", "group": 2 },
    { "id": "Peter", "group": 3 },
    { "id": "Rob", "group": 4 }

  ],
  "links": [
    { "source": "Joscha", "target": "Peter", "value": 1 },
    { "source": "Pascal", "target": "Peter", "value": 2 },
    { "source": "Rob", "target": "Peter", "value": 3 },
    { "source": "Peter", "target": "Joscha", "value": 4 }

  ]
}

@Component({
  selector: 'page-Network',
  templateUrl: 'Network.html'
})
export class NetworkPage {

  @ViewChild('network') network;
  @ViewChild('canvas') network1;


  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
/*
    var width = 640,
      height = 480;

    var links = [
      { source: 'Baratheon', target: 'Lannister' },
      { source: 'Baratheon', target: 'Stark' },
      { source: 'Lannister', target: 'Stark' },
      { source: 'Stark', target: 'Bolton' }
    ];
    // create empty nodes array
    var nodes = {};

    // compute nodes from links data
    links.forEach(function (link) {
      link.source = nodes[link.source] ||
        (nodes[link.source] = { name: link.source });
      link.target = nodes[link.target] ||
        (nodes[link.target] = { name: link.target });
    });
*/
    
        var svg = d3.select(this.network.nativeElement),
          width = +svg.attr("width"),
          height = +svg.attr("height");
        // "var color = d3.scaleOrdinal(d3.schemeCategory20);" nicht benutzt. braucht man um gruppe eine farbe zuzuordnen 
    
        var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function (d: any) { return d.id; }))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter())
          .force("center", d3.forceCenter(width, height));
    
        var link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
          .attr("stroke-width", function (d: any) { return Math.sqrt(d.value); });
    
        var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("circle")
          .attr("r", 15)
          .attr("fill", '#fff')
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        svg.call(d3.zoom()
          .scaleExtent([1 / 8, 10])
          .on("zoom", zoomed));
    
        node.append("title")
          .text(function (d: any) { return d.id; });
    
        simulation
          .nodes(graph.nodes)
          .on("tick", ticked);
    
          simulation.force("link")
        //      .links(graph.links);
        
        function ticked() {
          link
            .attr("x1", function (d: any) { return d.source.x; })
            .attr("y1", function (d: any) { return d.source.y; })
            .attr("x2", function (d: any) { return d.target.x; })
            .attr("y2", function (d: any) { return d.target.y; });
    
          node
            .attr("cx", function (d: any) { return d.x; })
            .attr("cy", function (d: any) { return d.y; });
        }
    
        function zoomed() {
          svg.attr("transform", d3.event.transform);
        }
    
        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
    
        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }
    
        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
    

  }
  backButton() {
    this.navCtrl.push(MainPage);
  }

}
