function LoadMoreElements()
{
	console.log('LoadMoreElements() imageNumber:', imageNumber);
	if(imageNumber >= totalImages ){
		console.log('reached the bottom of the list');
		return;
	}
	LoadCallback(imageList[imageNumber]);
	var url = imageList[imageNumber];

}

function LoadCallback(fileName)
{
	console.log('LoadCallback() imageNumber:', imageNumber);
	var el = document.getElementById('scrollContainer');
	var loading = document.getElementById('loadingDiv');
	loading.style.display = 'none';
	var d = getDate(fileName),
		fileInfo = fileInfoFormat (d);
	var data = {listItem:[ {src:fileName ,fileInfo:fileInfo, imageNumber:imageNumber}]};
		
	el.innerHTML += templater(data);
	imageNumber++;
}
function OnDivScroll()
{
	  var el = document.getElementById('scrollContainer');
	  if(el.scrollTop < el.scrollHeight - 800)
		return;
	  var loading = document.getElementById('loadingDiv');
	  if(loading.style.display == '')
		return; //already loading

	  loading.style.display = '';

	  LoadMoreElements();
}	
		
		
var parseFileName = function (fname){
	// format: 01-20150528221915-00.jpg
	var items = fname.split('-');
	var dater = items[1];
	var year = dater.substring(0,4),
		month = parseInt(dater.substring(4, 6))-1,
		day = dater.substring(6, 8),
		hour = dater.substring(8,10),
		minute = dater.substring(10,12),
		second = dater.substring(12),
		millisecond = items[2].split('.')[0];
	return {year:year, month:month, day:day, hour:hour ,minute:minute, second:second, millisecond:millisecond };
};

var getDate = function(fname){
	var o = parseFileName(fname);
	return new Date(o.year, o.month, o.day,o.hour ,o.minute, o.second, o.millisecond );
}

var fileInfoFormat = function(d){
	var mls = d.getMilliseconds();
	return (d.toLocaleString() + ' - '+ (mls <10?"0"+mls: mls));
};

var sortFileList = function(fileList){
	var tmpList = _.sortBy(fileList, function(item){
		var o = parseFileName(item);
		return parseInt(o.year + o.month+o.day+o.hour +o.minute+ o.second+ o.millisecond);
	})
	return tmpList;	
}

var revertSortFileList = function(fileList){
	var tmpList = sortFileList(fileList);
	var revertList = [];
	var max = tmpList.length-1;
	for(var i=max; i>=0; i--){
		revertList.push(tmpList[i]);
	}
	return revertList;
}