/**
* DevExtreme (file_management/upload_info.d.ts)
* Version: 24.1.1
* Build date: Tue May 07 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @namespace DevExpress.fileManagement
 * @public
 */
export default interface UploadInfo {
    /**
     * @docid
     * @public
     */
    bytesUploaded: number;

    /**
     * @docid
     * @public
     */
    chunkCount: number;

    /**
     * @docid
     * @public
     */
    customData: any;

    /**
     * @docid
     * @public
     */
    chunkBlob: Blob;

    /**
     * @docid
     * @public
     */
    chunkIndex: number;
}
