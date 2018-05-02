import destination from '@turf/destination';
import bearing from '@turf/bearing';
import bezier from 'turf-bezier';

export function getSourceData(source, propertie, type) {

    featuresToRender = { features : [], type: "FeatureCollection" };

    source.forEach(element => {
        element.features.filter(data => {
            if (data.properties[propertie] == type)
                featuresToRender.features.push(data)
            });
    });

    //console.log(featuresToRender);

    return featuresToRender;
}

export function applySplineToLineString(source) {

    source.features.map(data => {
        if (data.properties.element == 'ligne') {
            var y = Object.assign({}, data); 
            z = bezier(y, [resolution=5000], [sharpness=0.7]);
            Object.assign(data, z);
        }

        return data;
    });

}

export function addArrowToLigne(source) {

    source.features.map(data => {
        if (data.properties.element == 'ligne') {

            var y = Object.assign({}, data); 
            //console.log(y.geometry.coordinates.length);

            const lastpoint = y.geometry.coordinates[y.geometry.coordinates.length-1];
            const refpoint = y.geometry.coordinates[y.geometry.coordinates.length-20];

            //console.log(lastpoint);

            const angle = bearing(lastpoint,refpoint);
            //console.log(angle);
            const firstarrow = destination(lastpoint,30,angle+35,{units: 'meters'})
            const secondarrow = destination(lastpoint,30,angle-35,{units: 'meters'})

            //console.log(firstarrow.geometry.coordinates);

            y.geometry.coordinates.push(firstarrow.geometry.coordinates);

            //y.geometry.coordinates.push(refpoint);

            y.geometry.coordinates.push(lastpoint);

            y.geometry.coordinates.push(secondarrow.geometry.coordinates);

            Object.assign(data, y);
        }

        return data;
    });

}
